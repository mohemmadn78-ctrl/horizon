import React from 'react';
import { Camera, Eye, Smile, Mic, FileText, ArrowRight, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { ASSET_IMAGES } from '../services/apiService';

interface ScreeningHubViewProps {
  onNavigate: (view: string) => void;
  consentAgreed: boolean;
  onOpenConsent: () => void;
}

export const ScreeningHubView: React.FC<ScreeningHubViewProps> = ({
  onNavigate,
  consentAgreed,
  onOpenConsent
}) => {
  const modules = [
    {
      id: 'skin_screening',
      title: 'Skin Screening',
      subtitle: 'Dermatological Lesions & Dermatoses',
      description: 'Capture or upload a cutaneous image to screen for asymmetry, irregular borders, color variegation, and inflammatory patterns (acne, eczema, psoriasis).',
      image: ASSET_IMAGES.skin,
      icon: Camera,
      tag: 'Computer Vision · ABCDE Analyzer',
      capabilities: ['Asymmetry & border analysis', 'Color variegation detection', 'Visual evolution tracking'],
      limitations: ['Cannot diagnose melanoma alone', 'Does not replace dermoscopy/biopsy']
    },
    {
      id: 'eye_screening',
      title: 'Eye Screening',
      subtitle: 'Anterior Segment & Ocular Surface',
      description: 'Upload a clear front-eye photograph to analyze conjunctival hyperaemia, eyelid margins, stye/chalazion features, and scleral appearance.',
      image: ASSET_IMAGES.eye,
      icon: Eye,
      tag: 'Ophthalmic Anterior Model',
      capabilities: ['Conjunctival redness analysis', 'Blepharitis & eyelid margins', 'Scleral appearance check'],
      limitations: ['Cannot detect retinal diseases', 'Glaucoma/OCT requires clinic']
    },
    {
      id: 'dental_screening',
      title: 'Teeth & Oral Screening',
      subtitle: 'Intraoral Hard & Soft Tissue',
      description: 'Upload a well-lit photograph of teeth and gums to evaluate visible plaque, supragingival calculus, tooth discoloration, and marginal gingivitis signs.',
      image: ASSET_IMAGES.dental,
      icon: Smile,
      tag: 'Intraoral Stomatognathic Model',
      capabilities: ['Visible plaque & calculus detection', 'Gingival margin erythema', 'Enamel demineralization'],
      limitations: ['Interproximal decay requires bitewings', 'No subgingival bone inspection']
    },
    {
      id: 'voice_screening',
      title: 'Voice Screening',
      subtitle: 'Standardized Acoustic Phonation Protocol',
      description: 'Complete 5 standardized audio tasks (vowel sustain, paragraph reading, counting, natural speech, optional cough) to extract jitter, shimmer, and HNR.',
      image: ASSET_IMAGES.voice,
      icon: Mic,
      tag: 'Acoustic Signal Processing',
      capabilities: ['Fundamental frequency (F0)', 'Jitter & shimmer perturbations', 'Harmonics-to-noise ratio'],
      limitations: ['Voice alone is not proof of disease', 'ENT laryngoscopy required for folds']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span>Clinical Screening Hub</span>
          <span aria-hidden="true">·</span>
          <span>4 Modalities + Multimodal Triage</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Evidence-Based Health Screening
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed">
          Select an anatomical modality below. Every module runs a mandatory Universal Input-Quality Gate (checking resolution, lighting, focus, or SNR) prior to model inference.
        </p>
      </div>

      {/* Consent Notice Bar */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        consentAgreed
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          : 'bg-amber-50/90 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-start gap-3">
          <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${consentAgreed ? 'text-emerald-700' : 'text-amber-700'}`} />
          <div className="text-xs leading-relaxed">
            <span className="font-semibold">
              {consentAgreed ? 'Health Data Privacy Consent Active' : 'Patient Consent Required Before Screening'}
            </span>
            <p className={consentAgreed ? 'text-emerald-800' : 'text-amber-800'}>
              {consentAgreed
                ? 'Your preferences are saved: ephemeral server inference with zero unapproved permanent cloud archiving.'
                : 'Under clinical data governance standards, please review our privacy and processing agreement prior to uploading health media.'}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenConsent}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs transition-colors shrink-0"
        >
          {consentAgreed ? 'Manage Preferences' : 'Review Consent Agreement'}
        </button>
      </div>

      {/* Screening Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500/60 hover:shadow-md transition-all group"
            >
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <img
                  src={mod.image}
                  alt={mod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4 text-white">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-teal-600 rounded-md text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{mod.title}</p>
                      <p className="text-[11px] text-teal-300 font-mono">{mod.tag}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {mod.subtitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {mod.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Detects Patterns:</p>
                      <ul className="space-y-0.5 text-slate-500">
                        {mod.capabilities.map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-800 mb-1">Clinical Scope Limits:</p>
                      <ul className="space-y-0.5 text-amber-700">
                        {mod.limitations.map((l, i) => (
                          <li key={i}>• {l}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate(mod.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Begin {mod.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alternative Path: Describe Concern */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-100/90 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Not sure which module to select?</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Describe Your Concern via Free Text or Dictation
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Explain your symptoms in everyday language. Our triage engine will map your narrative to appropriate clinical categories, screen for acute emergency red flags, and guide you to the right specialist.
          </p>
        </div>
        <button
          onClick={() => onNavigate('concern')}
          className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors shrink-0"
        >
          Describe Concern
        </button>
      </div>
    </div>
  );
};
