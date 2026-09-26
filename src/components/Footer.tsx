import React from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      {/* Primary Medical Disclaimer Ribbon */}
      <div className="bg-slate-100/80 border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">Clinical Disclaimer:</span> AI screening is NOT a medical diagnosis. This web platform assists with preliminary pattern detection and health education. It never replaces evaluation by a board-certified physician, dentist, dermatologist, or ophthalmologist. If experiencing acute symptoms or severe pain, seek immediate emergency medical care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Platform Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center text-white">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight">PathoSense</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Evidence-based preliminary clinical pattern screening system prioritizing input quality gates, uncertainty bounds, explainability, and prompt human medical referral.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Sensitive Health Data Governance Active</span>
            </div>
          </div>

          {/* Col 2: Screening Pathways */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Screening Protocols</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('skin_screening')} className="hover:text-teal-700 transition-colors">
                  Skin Screening & ABCDE Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('eye_screening')} className="hover:text-teal-700 transition-colors">
                  Eye Screening (Anterior Segment)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dental_screening')} className="hover:text-teal-700 transition-colors">
                  Teeth & Oral Cavity Screening
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('voice_screening')} className="hover:text-teal-700 transition-colors">
                  Acoustic Voice & Speech Protocol
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('concern')} className="hover:text-teal-700 transition-colors">
                  Describe My Concern (Multimodal Triage)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-teal-700 transition-colors">
                  Screening History & Evolution Log
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Resources & Providers */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Clinical Network</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('diseases')} className="hover:text-teal-700 transition-colors">
                  Condition Encyclopedia & References
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-teal-700 transition-colors">
                  Find a Doctor (Specialists Directory)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hospitals')} className="hover:text-teal-700 transition-colors">
                  Find a Hospital / Diagnostic Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('emergency')} className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
                  Emergency Red Flags & Crisis Care
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Model Governance & Transparency */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Transparency & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about_ai')} className="hover:text-teal-700 transition-colors">
                  Model Validation & Benchmark Datasets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about_ai')} className="hover:text-teal-700 transition-colors">
                  Demographic Fairness & Skin-Tone Auditing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-teal-700 transition-colors">
                  Privacy Policy & Retention Protocols
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-teal-700 transition-colors">
                  User Data Deletion & Privacy Management
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PathoSense Research Platform. Designed for clinical decision support and health education.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:underline">
              Consent & Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('about_ai')} className="hover:underline">
              Validation Protocol
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('emergency')} className="text-rose-600 hover:underline">
              Emergency Guidance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
