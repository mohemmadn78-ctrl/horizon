import React, { useState, useRef } from 'react';
import {
  Eye,
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
import { submitEyeScreening, ASSET_IMAGES } from '../services/apiService';
import { InputQualityReport, ScreeningResult } from '../types';
import { CameraCaptureModal } from '../components/CameraCaptureModal';

interface EyeScreeningViewProps {
  onComplete: (result: ScreeningResult) => void;
  consentAgreed: boolean;
  onOpenConsent: () => void;
}

export const EyeScreeningView: React.FC<EyeScreeningViewProps> = ({
  onComplete,
  consentAgreed,
  onOpenConsent
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [eyeSide, setEyeSide] = useState('both');
  const [contactLensWearer, setContactLensWearer] = useState('no');
  const [visualBlurring, setVisualBlurring] = useState('none');

  const [isCheckingQuality, setIsCheckingQuality] = useState(false);
  const [qualityReport, setQualityReport] = useState<InputQualityReport | null>(null);
  const [isScreening, setIsScreening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  const loadPreset = (type: 'conjunctivitis' | 'blepharitis') => {
    setErrorMsg(null);
    if (type === 'conjunctivitis') {
      setImagePreview(ASSET_IMAGES.eye);
      setSymptoms('Eyes feel gritty, burning, and have noticeable pink/red redness with mild watery discharge.');
      setEyeSide('both');
      setContactLensWearer('no');
      runQualityCheck(ASSET_IMAGES.eye);
    } else if (type === 'blepharitis') {
      setImagePreview(ASSET_IMAGES.eye);
      setSymptoms('Eyelid margins feel irritated, itchy, and have crusty flakes around the eyelash bases in the mornings.');
      setEyeSide('both');
      setContactLensWearer('no');
      runQualityCheck(ASSET_IMAGES.eye);
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
      const report = await analyzeImageQuality(src, 'eye');
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
      setErrorMsg('Please upload or take a photograph of the eye with your camera.');
      return;
    }

    setIsScreening(true);
    setErrorMsg(null);

    try {
      const res = await submitEyeScreening({
        image: imagePreview,
        symptoms,
        context: {
          eyeSide,
          contactLensWearer,
          visualBlurring
        },
        forceQualityFail: false
      });
      onComplete(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Eye screening failed');
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
        title="Take Photo — Anterior Eye Screening"
        screeningType="eye"
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
        capture="user"
        className="hidden"
      />

      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Ophthalmology Protocol</span>
          <span aria-hidden="true">·</span>
          <span>Model: OculoScan-v1.8</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Anterior Segment & Ocular Surface Screening
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Evaluates visible anterior structures: conjunctival redness, eyelid swelling, styes, blepharitis crusting, and scleral appearance.
        </p>
      </div>

      {/* Critical Retinal Limitation Warning */}
      <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wide text-amber-900">
            Mandatory Retinal Diagnostic Boundary:
          </p>
          <p className="leading-relaxed text-amber-800">
            Visible anterior photography <strong>CANNOT</strong> evaluate internal retinal conditions, glaucoma optic disc damage, diabetic retinopathy, or age-related macular degeneration (AMD). Those require specialized dilated fundus photography, optical coherence tomography (OCT), or slit-lamp biomicroscopy by an optometrist or ophthalmologist.
          </p>
        </div>
      </div>

      {/* Preset Demos */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
          Quick Demo Presets:
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => loadPreset('conjunctivitis')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Conjunctival Hyperemia (Pink Eye)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('blepharitis')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Blepharitis / Eyelid Margin Irritation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image Capture & Quality */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">1. Ocular Image Input</h2>
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
                    alt="Eye preview"
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
                      Clear frontal view of the eye in comfortable, indirect lighting
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: Take Photo & Upload */}
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

            {/* Mobile native camera launcher */}
            <div className="text-center pt-0.5">
              <button
                type="button"
                onClick={() => nativeCameraInputRef.current?.click()}
                className="text-[11px] text-slate-500 hover:text-teal-700 underline"
              >
                Tap here to use phone camera app directly
              </button>
            </div>

            {/* Quality Status */}
            {isCheckingQuality && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 animate-pulse flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
                <span>Evaluating anterior eye illumination and corneal focus...</span>
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

        {/* Right Column: Symptoms & Clinical Context */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">2. Ocular Symptoms & Context</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Describe What You Are Experiencing
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Redness started yesterday morning, watery discharge, gritty feeling when blinking, eyelids glued shut upon waking..."
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Eye Affected</label>
                <select
                  value={eyeSide}
                  onChange={(e) => setEyeSide(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="both">Both Eyes</option>
                  <option value="right">Right Eye Only</option>
                  <option value="left">Left Eye Only</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Lenses?</label>
                <select
                  value={contactLensWearer}
                  onChange={(e) => setContactLensWearer(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="no">No</option>
                  <option value="soft">Yes (Soft Contacts)</option>
                  <option value="rigid">Yes (Rigid/Gas Permeable)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blurry Vision?</label>
                <select
                  value={visualBlurring}
                  onChange={(e) => setVisualBlurring(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="none">Normal vision</option>
                  <option value="clears_blinking">Blurry (clears when blinking)</option>
                  <option value="constant">Constant vision decrease (Urgent)</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

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
                  <span>Analyzing Anterior Eye Features...</span>
                ) : (
                  <>
                    <span>Run Calibrated Eye Screening</span>
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
