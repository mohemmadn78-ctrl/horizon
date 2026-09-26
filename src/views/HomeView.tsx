import React, { useState } from 'react';
import {
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
  Scale,
  Cpu,
  BrainCircuit,
  Lock,
  Zap,
  Sparkles
} from 'lucide-react';
import { ASSET_IMAGES } from '../services/apiService';
import { ClinicalSimulationConsole } from '../components/ClinicalSimulationConsole';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onOpenGroqAssistant?: (prompt?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenGroqAssistant }) => {
  return (
    <div className="space-y-16 py-6 sm:py-10 bg-biomedical-grid min-h-screen">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-800 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                DUAL-ENGINE CO-SYNTHESIS
              </span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>VISION + GROQ LPU (120B)</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>ISO 13485 ALIGNED</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
              Precision Clinical Health Screening & Differential Synthesis
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              An evidence-based multimodal screening platform combining computer-vision feature extraction with high-speed language processing units to identify health patterns, analyze differential diagnoses, and prepare structured doctor consultations.
            </p>

            {/* Mandatory Non-Diagnostic Caution */}
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Clinical Non-Diagnostic Standard
                </p>
                <p className="text-xs text-amber-800 leading-relaxed mt-0.5 font-medium">
                  PathoSense is an assistive preliminary decision support tool, NOT a definitive diagnosis. It extracts visual, acoustic, and symptom patterns to empower collaborative in-person clinical examinations with licensed medical professionals.
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('screening_hub')}
                className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Select a Screening Protocol</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('concern')}
                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Describe Symptoms</span>
              </button>

              <button
                onClick={() => onOpenGroqAssistant?.('Can you guide me on which screening module is right for my current symptoms?')}
                className="px-4 py-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/90 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Ask Groq Copilot</span>
              </button>
            </div>

            {/* Quick Precision Benchmarks */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Screening Pipelines</span>
                <span className="text-slate-900 font-bold text-sm">4 Modalities</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">LPU Reasoning Speed</span>
                <span className="text-teal-700 font-bold text-sm">&lt; 380 ms</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Cloud Storage</span>
                <span className="text-slate-900 font-bold text-sm">0 KB Retained</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Calibration Model</span>
                <span className="text-slate-900 font-bold text-sm">Bayesian 95%</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Banner with High-Tech Diagnostic Telemetry */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 aspect-16/11 group">
              <img
                src={ASSET_IMAGES.hero}
                alt="Clinical biomedical diagnostic laboratory instrumentation"
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Scanning visual overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 animate-scanline"></div>

              {/* Glassmorphic Lower Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between text-xs font-mono text-teal-300 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>DUAL-ENGINE ARCHITECTURE</span>
                  </div>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>
                <p className="text-sm font-semibold tracking-tight">Multimodal Co-Synthesis Active</p>
                <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                  Gemini 3.8 Multimodal visual feature maps + Groq LPU (openai/gpt-oss-120b) clinical reasoning engine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Innovative Live Clinical Simulation Console */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClinicalSimulationConsole
          onSelectModality={onNavigate}
          onOpenGroqAssistant={(prompt) => onOpenGroqAssistant?.(prompt)}
        />
      </section>

      {/* 3. Four Core Specialized Modalities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
            <span>Specialized Clinical Pipelines</span>
            <span aria-hidden="true">·</span>
            <span>Independent Validation Cohorts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Choose a Clinical Screening Protocol
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Each modality utilizes a dedicated computer-vision or acoustic architecture with mandatory input quality validation and uncertainty bounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Skin */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500 hover:shadow-md transition-all group shadow-xs">
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
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-teal-300 px-2 py-0.5 rounded">
                ISIC-2025 EVAL
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
                <div className="mt-3 text-[11px] text-slate-600 space-y-1 font-mono">
                  <p>• Asymmetry & Border Contour Check</p>
                  <p>• Color Variegation & Estimated Size</p>
                  <p>• Baseline Comparison Tracking</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('skin_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Skin Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Eye */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500 hover:shadow-md transition-all group shadow-xs">
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
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-teal-300 px-2 py-0.5 rounded">
                OCULAR-2025 EVAL
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
                <div className="mt-3 text-[11px] text-slate-600 space-y-1 font-mono">
                  <p>• Conjunctival Vascular Injection</p>
                  <p>• Blepharitis & Eyelid Margin Check</p>
                  <p className="text-amber-700 font-semibold">• Retinal exams require fundus/OCT</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('eye_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Eye Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Dental */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500 hover:shadow-md transition-all group shadow-xs">
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
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-teal-300 px-2 py-0.5 rounded">
                DENTAVISION-2025
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
                <div className="mt-3 text-[11px] text-slate-600 space-y-1 font-mono">
                  <p>• Supragingival Biofilm Mapping</p>
                  <p>• Marginal Gingival Hyperaemia</p>
                  <p className="text-amber-700 font-semibold">• Interproximal decay requires bitewings</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('dental_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Dental Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Voice */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-teal-500 hover:shadow-md transition-all group shadow-xs">
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
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-teal-300 px-2 py-0.5 rounded">
                ACOUSTIC-DSP-2025
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
                <div className="mt-3 text-[11px] text-slate-600 space-y-1 font-mono">
                  <p>• Sustained Phonation & Reading Tasks</p>
                  <p>• Acoustic Jitter & Shimmer Vectors</p>
                  <p className="text-amber-700 font-semibold">• Voice alone is not proof of pathology</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('voice_screening')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Voice Screening</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Natural Language Symptom Pathway */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <BrainCircuit className="w-96 h-96 text-teal-400" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
              <Zap className="w-4 h-4" />
              <span>HIGH-SPEED GROQ LPU SYMPTOM TRIAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Describe Your Health Concern in Plain English
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Prefer speaking or typing in your own words? Describe what you are experiencing ("My skin is itchy and peeling", "My voice has become raspy for two weeks", "My eyes feel gritty") to initiate multimodal symptom mapping with sub-second differential synthesis.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('concern')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Describe My Concern Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenGroqAssistant?.('I want to describe my symptoms in detail and get questions for my doctor.')}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-teal-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Open Conversational Triage</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The 4-Stage Dual Pipeline Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
            <span>Rigorous Methodology</span>
            <span aria-hidden="true">·</span>
            <span>4-Stage Clinical Safety Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Engineered for Precision & Transparency
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl mt-1">
            We reject black-box guesses. PathoSense enforces a decoupled pipeline where each stage verifies inputs, quantifies uncertainty, and provides actionable clinical utility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Input Quality Gate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Algorithmic verification for focal blur, exposure clipping, resolution thresholds, and acoustic SNR. Inadequate samples are rejected upfront.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">Multimodal Feature Maps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini 3.8 Multimodal Vision extracts anatomical boundaries, ABCDE asymmetry, vascular injection indices, and acoustic DSP perturbations.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">Groq LPU Synthesis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sub-second reasoning via Groq LPUs (`openai/gpt-oss-120b`) synthesizes findings with patient timeline to formulate differential diagnoses.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-mono font-bold text-xs">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-900">Doctor-Patient Action</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Translates technical findings into 5 actionable doctor discussion questions, red-flag escalation warnings, and verified specialist referrals.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Medical Directory Quick Routing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-700 uppercase">
              <Stethoscope className="w-4 h-4" />
              <span>DIRECT IN-PERSON CLINICAL ROUTING</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Connect with Board-Certified Specialists & Verified Clinics
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              Find dermatologists, ophthalmologists, dentists, periodontists, and otolaryngologists filtered by credentialing, accepted insurance, and location.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('doctors')}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Doctor Directory
            </button>
            <button
              onClick={() => onNavigate('hospitals')}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Hospitals & Clinics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
