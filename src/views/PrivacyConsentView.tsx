import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Trash2,
  Download,
  CheckCircle2,
  FileCheck,
  HardDrive,
  EyeOff,
  Server
} from 'lucide-react';
import { UserConsentState } from '../types';
import { purgeAllUserData, getScreeningHistory } from '../services/apiService';

interface PrivacyConsentViewProps {
  consent: UserConsentState;
  onSaveConsent: (consent: UserConsentState) => void;
  onPurgeData: () => void;
}

export const PrivacyConsentView: React.FC<PrivacyConsentViewProps> = ({
  consent,
  onSaveConsent,
  onPurgeData
}) => {
  const [dataAgreed, setDataAgreed] = useState(consent.data_collection_agreed);
  const [modelImprovement, setModelImprovement] = useState(consent.model_improvement_opt_in);
  const [localStorageAgreed, setLocalStorageAgreed] = useState(consent.local_storage_agreed);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  const handleSave = () => {
    onSaveConsent({
      data_collection_agreed: dataAgreed,
      model_improvement_opt_in: modelImprovement,
      local_storage_agreed: localStorageAgreed
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePurge = () => {
    if (window.confirm('Are you sure you want to permanently erase all locally stored medical screening records from this browser?')) {
      onPurgeData();
      purgeAllUserData();
      setPurgeSuccess(true);
      setTimeout(() => setPurgeSuccess(false), 3000);
    }
  };

  const handleExportData = () => {
    const history = getScreeningHistory();
    const exportBundle = {
      consentPreferences: consent,
      exportTimestamp: new Date().toISOString(),
      screeningsCount: history.length,
      screenings: history
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `ClinicaScreen_HealthDataExport_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Data Governance & Ethics</span>
          <span aria-hidden="true">·</span>
          <span>Sensitive Health Information</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Privacy Policy, Data Security & Patient Consent
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          ClinicaScreen AI is engineered under the principle that sensitive health information belongs exclusively to the individual. Learn how your data is processed, protected, and completely under your control.
        </p>
      </div>

      {/* Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
            <Lock className="w-4 h-4 text-teal-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Encrypted Transmission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All data in transit is protected using modern TLS 1.3 / HTTPS encryption. No unencrypted plain HTTP transmission is permitted.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
            <EyeOff className="w-4 h-4 text-teal-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Zero Identifying Profile</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We do not require government identifiers, credit cards, or social security numbers. You can screen completely anonymously.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
            <Server className="w-4 h-4 text-teal-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Ephemeral Inference</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Photographs and acoustic voice files are processed in transient volatile RAM during feature extraction and purged immediately after completion.
          </p>
        </div>
      </div>

      {/* Mandatory Section 3 Disclosures */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Detailed Health Data Processing Disclosure (Section 3)
        </h2>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
              1. What Information is Collected?
            </h3>
            <p>
              When initiating a screening, you voluntarily submit high-resolution photographs (skin lesions, anterior eyes, or intraoral arches), audio recordings during standardized vocal tasks (sustained vowels, reading passage, counting), and text/voice-transcribed descriptions of your symptoms, duration, and clinical history.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
              2. Why is this Information Processed?
            </h3>
            <p>
              Your inputs are processed strictly to extract objective biomedical features: geometric lesion asymmetry, border edge sharpness, color variegation, corneal clarity, dental plaque accumulation, fundamental frequency (F0), acoustic jitter, and harmonics-to-noise ratios. These patterns are compared against clinically calibrated reference thresholds to generate preliminary health screening findings and specialist recommendations.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
              3. Are Images and Audio Stored on Cloud Servers?
            </h3>
            <p>
              <strong>No.</strong> ClinicaScreen AI operates on a local-first, ephemeral model. The server does not store uploaded images or audio files in permanent persistent databases without separate written protocol consent. Screening summaries are stored directly in your browser's private local storage on your device.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
              4. How Long is Information Retained?
            </h3>
            <p>
              Server memory buffers are flushed immediately after the HTTP response is completed (typically under 2 seconds). Local screening history remains on your current device until you choose to clear your browser cache or click the "Purge All Data" button below.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
              5. Is Data Used for Model Improvement?
            </h3>
            <p>
              Only if you explicitly opt-in below. By default, model improvement is disabled. If you opt-in, only de-identified, non-facial feature vectors (e.g. asymmetry ratios or acoustic jitter percentages) are evaluated in blinded academic validation studies.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
              6. How Can the User Delete Their Data?
            </h3>
            <p>
              You maintain unilateral deletion rights. You can purge all cached records at any time using the one-click erasure control below.
            </p>
          </div>
        </div>

        {/* Interactive Consent Configuration */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
            Your Active Privacy & Consent Settings
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={dataAgreed}
                onChange={(e) => setDataAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">
                  Clinical Screening Processing Consent (Required for Screening)
                </span>
                I acknowledge that ClinicaScreen AI is an evidence-based preliminary decision support system and NOT a medical diagnosis. I consent to transient computer-vision and acoustic feature extraction.
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={localStorageAgreed}
                onChange={(e) => setLocalStorageAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">
                  Device Local Storage Persistence
                </span>
                Allow my browser's private local storage to save my previous screening reports so I can track lesion changes over time.
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={modelImprovement}
                onChange={(e) => setModelImprovement(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">
                  Model Calibration & Academic Improvement (Optional)
                </span>
                Permit anonymized, non-identifying biometric feature metrics to be included in public peer-reviewed bias and demographic fairness benchmarks.
              </div>
            </label>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors shadow-xs"
            >
              Save Consent Preferences
            </button>

            {savedSuccess && (
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Preferences updated successfully
              </span>
            )}
          </div>
        </div>

        {/* Patient Data Rights Control Suite */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Right to Erasure & Portability
            </h4>
            <p className="text-xs text-slate-500">
              Download your complete screening audit file or purge every local record immediately.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Health Data</span>
            </button>
            <button
              onClick={handlePurge}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge All Records</span>
            </button>
          </div>
        </div>

        {purgeSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All local screening history and cached files have been permanently erased.</span>
          </div>
        )}
      </div>
    </div>
  );
};
