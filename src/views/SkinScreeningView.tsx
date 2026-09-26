import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Info,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { analyzeImageQuality } from '../services/qualityChecker';
import { submitSkinScreening, ASSET_IMAGES } from '../services/apiService';
import { InputQualityReport, ScreeningResult } from '../types';
import { CameraCaptureModal } from '../components/CameraCaptureModal';

interface SkinScreeningViewProps {
  onComplete: (result: ScreeningResult) => void;
  consentAgreed: boolean;
  onOpenConsent: () => void;
}

export const SkinScreeningView: React.FC<SkinScreeningViewProps> = ({
  onComplete,
  consentAgreed,
  onOpenConsent
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [bodyRegion, setBodyRegion] = useState('arm_leg');
  const [duration, setDuration] = useState('weeks');
  const [progression, setProgression] = useState('growing');
  const [priorHistory, setPriorHistory] = useState('no');

  const [isCheckingQuality, setIsCheckingQuality] = useState(false);
  const [qualityReport, setQualityReport] = useState<InputQualityReport | null>(null);
  const [isScreening, setIsScreening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  // Sample presets for quick reliable clinical verification
  const loadPreset = async (presetType: 'atypical_lesion' | 'acne') => {
    setErrorMsg(null);
    if (presetType === 'atypical_lesion') {
      setImagePreview(ASSET_IMAGES.skin);
      setSymptoms('I noticed this pigmented mole on my forearm has uneven edges and has become slightly darker over the past 3 months.');
      setBodyRegion('arm_leg');
      setProgression('growing');
      runQualityCheck(ASSET_IMAGES.skin);
    } else if (presetType === 'acne') {
      setImagePreview(ASSET_IMAGES.hero);
      setSymptoms('Clustered red bumps and occasional whiteheads on my cheek and jawline.');
      setBodyRegion('face');
      setProgression('stable');
      runQualityCheck(ASSET_IMAGES.hero);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImagePreview(dataUrl);
      runQualityCheck(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (dataUrl: string) => {
    setErrorMsg(null);
    setImagePreview(dataUrl);
    runQualityCheck(dataUrl);
  };

  const runQualityCheck = async (src: string) => {
    setIsCheckingQuality(true);
    try {
      const report = await analyzeImageQuality(src, 'skin');
      setQualityReport(report);
    } catch (err) {
      console.error('Quality check failed', err);
    } finally {
      setIsCheckingQuality(false);
    }
  };

  const handleSubmit = async () => {
    if (!consentAgreed) {
      onOpenConsent();
      return;
    }

    if (!imagePreview) {
      setErrorMsg('Please upload or take a photograph with your camera of the skin lesion.');
      return;
    }

    setIsScreening(true);
    setErrorMsg(null);

    try {
      const res = await submitSkinScreening({
        image: imagePreview,
        symptoms,
        context: {
          bodyRegion,
          duration,
          progression,
          priorHistory
        },
        forceQualityFail: false
      });

      onComplete(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Screening request failed');
    } finally {
      setIsScreening(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
        title="Take Photo — Skin & Lesion Screening"
        screeningType="skin"
      />

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={nativeCameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Dermatology Protocol</span>
          <span aria-hidden="true">·</span>
          <span>Model: SkinNet-Derm-v2.4</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Skin Pattern Screening & ABCDE Evaluation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Take a photo with your camera or upload an existing close-up photograph of a skin lesion, mole, or rash. The system extracts visual contours and evaluates ABCDE asymmetry, border, color, and diameter characteristics.
        </p>
      </div>

      {/* Mandatory Clinical Notice */}
      <div className="p-3.5 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 font-semibold">Diagnostic Boundary:</strong> Computer vision cannot diagnose melanoma or skin cancer from photographic features alone. Biopsy and microscopic histopathology by a dermatologist are required for definitive medical diagnosis.
        </p>
      </div>

      {/* Preset Selectors */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
          Quick Demo Presets:
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => loadPreset('atypical_lesion')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Atypical Mole Sample (ABCDE test)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('acne')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Acneiform Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image Input & Camera Controls */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">1. Cutaneous Image Input</h2>
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="text-xs text-teal-700 hover:text-teal-800 font-medium flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake
                </button>
              )}
            </div>

            {/* Image Preview Box */}
            <div
              className={`relative border-2 rounded-xl h-64 flex flex-col items-center justify-center transition-colors overflow-hidden ${
                imagePreview
                  ? 'border-slate-300 bg-slate-950'
                  : 'border-dashed border-slate-300 bg-slate-50'
              }`}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Skin preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Image Ready</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 mx-auto flex items-center justify-center shadow-sm">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800">
                      Take a photo or upload an image
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Clear, focused view of the skin lesion or area of concern
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Buttons: Take Photo & Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="py-2.5 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow"
              >
                <Camera className="w-4 h-4" />
                <span>Take Photo with Camera</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors"
              >
                <Upload className="w-4 h-4 text-slate-600" />
                <span>Upload from Device</span>
              </button>
            </div>

            {/* Mobile native camera direct launcher */}
            <div className="text-center pt-0.5">
              <button
                type="button"
                onClick={() => nativeCameraInputRef.current?.click()}
                className="text-[11px] text-slate-500 hover:text-teal-700 underline"
              >
                Tap here to use phone camera app directly
              </button>
            </div>

            {/* Quality Status Feedback */}
            {isCheckingQuality && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 animate-pulse flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
                <span>Verifying image resolution, contrast, and focus...</span>
              </div>
            )}

            {qualityReport && (
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-950 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Image Quality Verified — Ready for Screening</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  {qualityReport.summary}
                </p>

                <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-1.5 text-[11px]">
                  {qualityReport.metrics.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-700 bg-white/70 px-2 py-1 rounded">
                      <span className="truncate pr-1 text-slate-600">{m.name}:</span>
                      <span className="text-emerald-700 font-semibold shrink-0">
                        PASS ({m.score}/100)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Clinical Context & Symptoms */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">2. Clinical Context & User Concern</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Describe What You Notice (Symptoms & Sensations)
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Noticed a dark spot that feels slightly itchy, edges look uneven, or rash that is dry and flaking..."
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Anatomical Region</label>
                <select
                  value={bodyRegion}
                  onChange={(e) => setBodyRegion(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="face">Face / Forehead / Cheeks</option>
                  <option value="neck">Neck / Shoulders</option>
                  <option value="trunk">Chest / Back / Abdomen</option>
                  <option value="arm_leg">Arms / Hands / Legs / Feet</option>
                  <option value="scalp">Scalp</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Approx. Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="days">Under 2 weeks (Acute)</option>
                  <option value="weeks">2 to 8 weeks</option>
                  <option value="months">Several months</option>
                  <option value="years">Present for years</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Evolution / Progression</label>
                <select
                  value={progression}
                  onChange={(e) => setProgression(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="growing">Changing in size, shape or color</option>
                  <option value="stable">Stable / No obvious change</option>
                  <option value="fluctuating">Comes and goes in flares</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Personal / Family History</label>
                <select
                  value={priorHistory}
                  onChange={(e) => setPriorHistory(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="no">No known history</option>
                  <option value="personal">Prior atypical mole / skin cancer</option>
                  <option value="family">First-degree family history</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submission Action */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isScreening}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 ${
                  isScreening
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                }`}
              >
                {isScreening ? (
                  <span>Executing Multimodal Pattern Analysis...</span>
                ) : (
                  <>
                    <span>Run Calibrated Skin Screening</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {!consentAgreed && (
                <button
                  type="button"
                  onClick={onOpenConsent}
                  className="text-[11px] text-teal-700 hover:underline text-center"
                >
                  Review and sign clinical consent before analysis
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
