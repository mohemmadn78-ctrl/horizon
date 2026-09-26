import React from 'react';
import {
  Sparkles,
  Camera,
  Eye,
  Smile,
  Mic,
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Activity,
  Layers,
  Scale
} from 'lucide-react';
import { ASSET_IMAGES } from '../services/apiService';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <span>Evidence-Based Clinical Decision Support</span>
              <span aria-hidden="true">·</span>
              <span>ISO 13485 Research Design</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              AI-Assisted Health Screening
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Analyze selected health-related images, voice recordings, and symptoms to identify patterns that may require further evaluation.
            </p>

            {/* Crucial mandatory disclaimer box */}
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Clinical Principle & Non-Diagnostic Guarantee
                </p>
                <p className="text-xs text-amber-800 leading-relaxed mt-0.5 font-medium">
                  AI screening is not a medical diagnosis. The platform identifies visual, acoustic, and symptom patterns to guide appropriate in-person consultations with doctors, dentists, dermatologists, and ophthalmologists.
                </p>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('screening_hub')}
                className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <span>Select a Screening Module</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('concern')}
                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Describe My Concern</span>
              </button>
            </div>

            {/* Trust and Clinical Quality Markers */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Universal Input Quality Gate
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Uncertainty Detection Active
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Zero Cloud Storage Without Consent
              </span>
            </div>
          </div>

          {/* Hero Right Visual Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-16/10">
              <img
                src={ASSET_IMAGES.hero}
                alt="Clinical biomedical diagnostic laboratory instrumentation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-300 mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>CALIBRATED CLINICAL PIPELINE</span>
                </div>
                <p className="text-sm font-semibold">Specialized Multi-Model Inference</p>
                <p className="text-xs text-slate-300">
                  Separated domain architectures for dermatological, ocular, stomatognathic, and acoustic voice patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Primary Screening Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Core Diagnostics</span>
            <span aria-hidden="true">·</span>
            <span>4 Specialized Modalities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Choose a Screening Protocol
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Each modality utilizes a dedicated, independently calibrated computer-vision or acoustic architecture with mandatory input quality validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Skin */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500/50 hover:shadow-md transition-all group">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={ASSET_IMAGES.skin}
                alt="Skin lesion dermatoscopy inspection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-md p-1.5 shadow-sm text-teal-700">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Skin Screening
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Analyze pigmented lesions, rashes, acne, psoriasis, and dermatitis patterns with automated ABCDE criteria evaluation.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <p>• Asymmetry & Border Border Analysis</p>
                  <p>• Color Variegation & Estimated Size</p>
                  <p>• Visual Evolution Baseline Comparison</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('skin_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Skin Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Eye */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500/50 hover:shadow-md transition-all group">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={ASSET_IMAGES.eye}
                alt="Ophthalmic anterior ocular examination"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-md p-1.5 shadow-sm text-teal-700">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Eye Screening
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Assess anterior segment patterns including conjunctival redness, eyelid swelling, styes, blepharitis, and visible sclera.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <p>• Conjunctival Vascular Injection</p>
                  <p>• Blepharitis & Eyelid Margin Check</p>
                  <p className="text-amber-700 font-medium">• Retinal exams require fundus/OCT</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('eye_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Eye Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Dental */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500/50 hover:shadow-md transition-all group">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={ASSET_IMAGES.dental}
                alt="Intraoral dental imaging inspection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-md p-1.5 shadow-sm text-teal-700">
                <Smile className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Teeth & Oral Screening
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Identify visible enamel demineralization, plaque accumulation, supragingival calculus, and marginal gingivitis signs.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <p>• Supragingival Plaque & Calculus</p>
                  <p>• Marginal Gingival Erythema</p>
                  <p className="text-amber-700 font-medium">• Interproximal decay requires bitewings</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('dental_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Dental Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Voice */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500/50 hover:shadow-md transition-all group">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={ASSET_IMAGES.voice}
                alt="Acoustic voice spectrogram and speech analysis"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-md p-1.5 shadow-sm text-teal-700">
                <Mic className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Voice Screening
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Standardized 5-task protocol measuring fundamental frequency, acoustic jitter, shimmer perturbation, and harmonics-to-noise ratio.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <p>• Sustained Vowel & Passage Reading</p>
                  <p>• Acoustic Perturbation Extraction</p>
                  <p className="text-amber-700 font-medium">• Voice alone is not proof of disease</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('voice_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Voice Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Secondary Option: Describe My Concern */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
              <FileText className="w-4 h-4" />
              <span>NATURAL LANGUAGE SYMPTOM PATHWAY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Describe Your Health Concern in Plain English
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Prefer typing or speaking? Enter what you are experiencing ("My skin is itchy", "My voice has become raspy", "My eyes feel gritty") to initiate multimodal symptom mapping with automatic emergency triage.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('concern')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <span>Describe My Concern Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 8-Pillar Clinical Pipeline Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Rigorous Methodology</span>
            <span aria-hidden="true">·</span>
            <span>Section 10 Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Multimodal Evidence Processing Engine
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl mt-1">
            We reject the monolithic approach of a single model guessing every human disease. ClinicaScreen AI enforces a separated multi-stage safety pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">1. Universal Input Quality Gate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Before running any AI model, inputs undergo strict algorithmic checks for blur, exposure, resolution, SNR, and clipping. Inadequate samples are immediately rejected rather than hallucinating answers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Scale className="w-4 h-4 text-teal-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">2. Calibrated Uncertainty Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The engine prioritizes "I don't know" over an erroneous prediction. Three strict outcome states: (A) Sufficient Evidence, (B) Uncertain, or (C) Poor Input. Never forced to choose a disease.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-teal-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">3. Human Medical Oversight</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every finding leads directly to specialized doctor directories, hospital finders, educational non-prescriptive medical facts, and clear guidance on when to seek urgent in-person care.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Direct Directory Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 rounded-xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Find Verified Doctors & Clinics Near You</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Access board-certified dermatologists, ophthalmologists, dentists, periodontists, and otolaryngologists filtered by location and credentials.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('doctors')}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
            >
              Doctor Directory
            </button>
            <button
              onClick={() => onNavigate('hospitals')}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
            >
              Hospital & Clinics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
