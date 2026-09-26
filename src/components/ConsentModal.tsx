import React, { useState } from 'react';
import { ShieldCheck, Lock, Trash2, CheckCircle2, X } from 'lucide-react';
import { UserConsentState } from '../types';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  consent: UserConsentState;
  onSaveConsent: (consent: UserConsentState) => void;
  onPurgeData: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onClose,
  consent,
  onSaveConsent,
  onPurgeData
}) => {
  const [dataAgreed, setDataAgreed] = useState(consent.data_collection_agreed);
  const [modelImprovement, setModelImprovement] = useState(consent.model_improvement_opt_in);
  const [localStorageAgreed, setLocalStorageAgreed] = useState(consent.local_storage_agreed);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConsent({
      data_collection_agreed: dataAgreed,
      model_improvement_opt_in: modelImprovement,
      local_storage_agreed: localStorageAgreed
    });
    onClose();
  };

  const handlePurge = () => {
    if (window.confirm('Are you sure you want to permanently delete all locally saved screening results and cached records?')) {
      onPurgeData();
      setPurgeSuccess(true);
      setTimeout(() => setPurgeSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Health Data Privacy & Consent Agreement</h2>
              <p className="text-xs text-slate-500">Sensitive Clinical Data Governance Framework</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          <div className="bg-teal-50/60 border border-teal-200/70 rounded-lg p-3.5 flex items-start gap-3">
            <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <p className="text-xs text-teal-900 leading-relaxed">
              Health information is treated as highly sensitive data. PathoSense uses encrypted HTTPS in-flight transmission and strict transient processing. We do not require your real name, government ID, or insurance information.
            </p>
          </div>

          {/* Section 1: What is collected */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
              1. Information Collected & Processing Purpose
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When using PathoSense, you may submit photographs of skin, eyes, or teeth, acoustic audio recordings of your voice during standardized phonation tasks, and self-reported descriptions of your symptoms or duration. This data is processed strictly to extract relevant mathematical and visual patterns (such as lesion asymmetry or acoustic jitter) for preliminary decision support.
            </p>
          </div>

          {/* Section 2: Storage & Retention */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
              2. Data Storage & Retention Policy
            </h3>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4 leading-relaxed">
              <li>
                <span className="font-medium text-slate-800">Inference Lifetime:</span> Images and audio files are processed in ephemeral server memory during inference and are discarded immediately after analysis.
              </li>
              <li>
                <span className="font-medium text-slate-800">Local History:</span> Screening summaries are stored directly in your browser's private local storage on your device.
              </li>
              <li>
                <span className="font-medium text-slate-800">No Unapproved Cloud Archives:</span> No permanent identifying database is maintained without explicit secondary consent.
              </li>
            </ul>
          </div>

          {/* Section 3: Deletion Rights */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
              3. Right to Erasure & Data Deletion
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You retain total control over your health records. You can delete individual screenings or purge your entire screening history at any moment using the button below or within the History page.
            </p>
          </div>

          {/* Interactive Consent Toggles */}
          <div className="pt-2 border-t border-slate-200 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dataAgreed}
                onChange={(e) => setDataAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-xs leading-relaxed text-slate-800">
                <strong className="font-medium text-slate-900">Mandatory Clinical Screening Consent:</strong> I acknowledge that PathoSense is an experimental preliminary decision support tool and NOT a medical diagnosis. I consent to transient image, audio, and symptom feature analysis.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localStorageAgreed}
                onChange={(e) => setLocalStorageAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-xs leading-relaxed text-slate-700">
                Allow browser local storage to save my screening history and evolution log on this device for my personal reference.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={modelImprovement}
                onChange={(e) => setModelImprovement(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-xs leading-relaxed text-slate-700">
                (Optional) Allow de-identified, anonymized pattern metrics to be evaluated in academic model validation studies.
              </span>
            </label>
          </div>

          {/* Purge controls */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePurge}
              className="text-xs text-rose-700 hover:text-rose-800 flex items-center gap-1.5 py-1.5 px-2.5 rounded-md hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge All Stored Data</span>
            </button>
            {purgeSuccess && (
              <span className="text-xs text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All local records purged
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200/80 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dataAgreed}
            className={`px-5 py-2 text-xs font-semibold rounded-lg shadow-sm transition-colors ${
              dataAgreed
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Confirm & Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
