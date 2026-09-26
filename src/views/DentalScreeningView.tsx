import React, { useState, useRef } from 'react';
import {
  Smile,
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
import { submitDentalScreening, ASSET_IMAGES } from '../services/apiService';
import { InputQualityReport, ScreeningResult } from '../types';
import { CameraCaptureModal } from '../components/CameraCaptureModal';

interface DentalScreeningViewProps {
  onComplete: (result: ScreeningResult) => void;
  consentAgreed: boolean;
  onOpenConsent: () => void;
}

export const DentalScreeningView: React.FC<DentalScreeningViewProps> = ({
  onComplete,
  consentAgreed,
  onOpenConsent
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [bleedingGums, setBleedingGums] = useState('sometimes');
  const [sensitivity, setSensitivity] = useState('cold');
  const [lastCheckup, setLastCheckup] = useState('over_year');

  const [isCheckingQuality, setIsCheckingQuality] = useState(false);
  const [qualityReport, setQualityReport] = useState<InputQualityReport | null>(null);
  const [isScreening, setIsScreening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  const loadPreset = (type: 'plaque_gingivitis' | 'caries_stain') => {
    setErrorMsg(null);
    if (type === 'plaque_gingivitis') {
      setImagePreview(ASSET_IMAGES.dental);
      setSymptoms('Gums bleed when brushing or flossing, look slightly swollen along the lower front teeth.');
      setBleedingGums('daily');
      setSensitivity('none');
      runQualityCheck(ASSET_IMAGES.dental);
    } else if (type === 'caries_stain') {
      setImagePreview(ASSET_IMAGES.dental);
      setSymptoms('Noticed dark staining in the grooves of back teeth and mild sensitivity when drinking cold water.');
      setBleedingGums('rarely');
      setSensitivity('cold');
      runQualityCheck(ASSET_IMAGES.dental);
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
      const report = await analyzeImageQuality(src, 'dental');
      setQualityReport(report);
    } catch (err) {
      console.error('Dental quality check failed', err);
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
      setErrorMsg('Please upload or take a photograph with your camera showing your teeth and gumlines.');
      return;
    }

    setIsScreening(true);
    setErrorMsg(null);

    try {
      const res = await submitDentalScreening({
        image: imagePreview,
        symptoms,
        context: {
          bleedingGums,
          sensitivity,
          lastCheckup
        },
        forceQualityFail: false
      });
      onComplete(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Dental screening request failed');
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
        title="Take Photo — Teeth & Oral Screening"
        screeningType="dental"
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
          <span>Oral & Stomatognathic Protocol</span>
          <span aria-hidden="true">·</span>
          <span>Model: DentaVision-v2.1</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Teeth & Oral Cavity Pattern Screening
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Evaluates visible dental surfaces for plaque biofilm, supragingival calculus accumulation, cervical enamel demineralization, and marginal gingivitis.
        </p>
      </div>

      {/* Mandatory Radiographic Boundary */}
      <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wide text-amber-900">
            Mandatory Radiographic & Periodontal Limitation:
          </p>
          <p className="leading-relaxed text-amber-800">
            Standard photographs cannot detect interproximal (hidden between teeth) cavities, root tip infections, alveolar bone resorption, or subgingival periodontal pocketing. Only bitewing/periapical X-rays and tactile dental probing by a licensed dentist can evaluate these conditions.
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
            onClick={() => loadPreset('plaque_gingivitis')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Gingivitis & Plaque Sample
          </button>
          <button
            type="button"
            onClick={() => loadPreset('caries_stain')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Enamel Caries & Staining Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image Capture & Quality */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">1. Intraoral Photo Input</h2>
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
                    alt="Dental preview"
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
                      Gently smile with teeth together or slightly open to reveal gums
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
                <span>Analyzing enamel surface contrast and intraoral focus...</span>
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
            <h2 className="text-sm font-bold text-slate-900">2. Oral Symptoms & History</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Describe Your Oral Concern
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Gums bleed when flossing, toothache in upper left molar when chewing, noticed dark line on front tooth..."
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bleeding Gums?</label>
                <select
                  value={bleedingGums}
                  onChange={(e) => setBleedingGums(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes during brushing</option>
                  <option value="daily">Daily / Frequently</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Temperature Sensitivity?</label>
                <select
                  value={sensitivity}
                  onChange={(e) => setSensitivity(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="none">No sensitivity</option>
                  <option value="cold">Sensitive to cold water/ice</option>
                  <option value="hot">Sensitive to hot liquids</option>
                  <option value="sweet">Sensitive to sweet foods</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Last Dental Cleaning</label>
                <select
                  value={lastCheckup}
                  onChange={(e) => setLastCheckup(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                >
                  <option value="under_6mo">Less than 6 months ago</option>
                  <option value="6_12mo">6 to 12 months ago</option>
                  <option value="over_year">More than 1 year ago</option>
                  <option value="never">Never had cleaning</option>
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
                  <span>Analyzing Oral Surface Patterns...</span>
                ) : (
                  <>
                    <span>Run Calibrated Dental Screening</span>
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
