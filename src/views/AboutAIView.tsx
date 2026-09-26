import React, { useState } from 'react';
import {
  ShieldCheck,
  Scale,
  Activity,
  Layers,
  FileCheck,
  Award,
  AlertTriangle,
  Cpu,
  BarChart3,
  CheckCircle2,
  Users
} from 'lucide-react';
import { MODEL_VALIDATION_METRICS } from '../data/medicalDatabase';

export const AboutAIView: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState(MODEL_VALIDATION_METRICS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Model Architecture & Transparency</span>
          <span aria-hidden="true">·</span>
          <span>Section 18 & 19 Standards</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Clinical Model Validation & Ethical AI Safety Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          ClinicaScreen AI enforces strict separation between domain-specific models. Explore independent validation cohorts, sensitivity/specificity benchmarks, demographic bias audits across Fitzpatrick skin tones, and our multi-stage safety layers.
        </p>
      </div>

      {/* Safety Layer Architecture Diagram Cards (Section 20) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <div>
          <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider">
            MULTI-STAGE PROCESSING PIPELINE (SECTION 10 & 20)
          </span>
          <h2 className="text-xl font-bold mt-1">
            Independent AI Safety Architecture
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Every query passes through a multi-tier safety gate before any findings are presented to the patient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="text-teal-400 font-mono font-bold block text-[11px]">GATE 01</span>
            <h3 className="font-bold text-white text-sm">Universal Quality Gate</h3>
            <p className="text-slate-300 leading-relaxed">
              Algorithmic verification of optical resolution, focal blur (Laplacian variance), SNR, clipping, and illumination. Rejects substandard inputs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="text-teal-400 font-mono font-bold block text-[11px]">GATE 02</span>
            <h3 className="font-bold text-white text-sm">Emergency Triage Layer</h3>
            <p className="text-slate-300 leading-relaxed">
              Automated NLP inspection for acute red flags (crushing chest pain, sudden vision loss, anaphylaxis). Disables screening and redirects to emergency services.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="text-teal-400 font-mono font-bold block text-[11px]">GATE 03</span>
            <h3 className="font-bold text-white text-sm">Uncertainty Assessment</h3>
            <p className="text-slate-300 leading-relaxed">
              Platt temperature calibration and uncertainty bounds. The engine triggers "Outcome B: Uncertain" rather than hallucinating an inaccurate disease.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="text-teal-400 font-mono font-bold block text-[11px]">GATE 04</span>
            <h3 className="font-bold text-white text-sm">Non-Prescription Guard</h3>
            <p className="text-slate-300 leading-relaxed">
              Strictly prevents automated prescription generation or diagnostic claims. Pairs findings with peer-reviewed medical monographs and human doctor referrals.
            </p>
          </div>
        </div>
      </div>

      {/* Groq LPU Accelerated Inference Architecture */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 rounded-2xl p-6 sm:p-8 text-white space-y-5 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase">
              <span>ACCELERATED INFERENCE CORE</span>
              <span aria-hidden="true">·</span>
              <span>GROQ LPU ARCHITECTURE</span>
            </div>
            <h2 className="text-xl font-bold mt-1 text-white">
              Groq openai/gpt-oss-120b Clinical Reasoning
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs border border-teal-500/40">
            reasoning_effort: medium · stream: true
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          ClinicaScreen AI leverages <strong>Groq's Language Processing Units (LPUs)</strong> running the open-weights <strong>openai/gpt-oss-120b</strong> foundation model. This dedicated architecture enables deterministic, sub-second latency for clinical symptom triage, conversational decision support, and doctor visit question generation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-teal-400 font-bold block">1. Low Latency Streaming</span>
            <p className="text-slate-300">Tokens stream to user devices in real time with minimal time-to-first-token, keeping consultation interactive.</p>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-teal-400 font-bold block">2. Clinical Guardrails</span>
            <p className="text-slate-300">Prompt-anchored clinical safety directives enforce non-diagnostic language, emergency escalation, and provider referrals.</p>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1.5">
            <span className="text-teal-400 font-bold block">3. JSON Structured Triage</span>
            <p className="text-slate-300">Deterministic JSON schema outputs guarantee calibrated confidence levels, evidence parsing, and specialist routing.</p>
          </div>
        </div>
      </div>

      {/* Model Validation Benchmarks Table (Section 18) */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Quantitative Rigor</span>
            <span aria-hidden="true">·</span>
            <span>Independent Benchmarks</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Independently Validated Model Performance
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Performance metrics evaluated on held-out external clinical test sets. We do not publish models as medically reliable without independent multi-center verification.
          </p>
        </div>

        {/* Model Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {MODEL_VALIDATION_METRICS.map((m) => (
            <button
              key={m.model_name}
              onClick={() => setSelectedMetric(m)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedMetric.model_name === m.model_name
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {m.model_name} ({m.specialty.split(' ')[0]})
            </button>
          ))}
        </div>

        {/* Selected Model Deep Dive */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-800 font-semibold">
                <span>ACTIVE MODEL: {selectedMetric.model_name}</span>
                <span aria-hidden="true">·</span>
                <span>AUDITED: {selectedMetric.last_validated}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {selectedMetric.specialty}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Target Pattern Classes: {selectedMetric.target_conditions.join(' · ')}
              </p>
            </div>
            {selectedMetric.published_peer_review && (
              <span className="text-[11px] text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                Evaluation: {selectedMetric.published_peer_review}
              </span>
            )}
          </div>

          {/* Metric KPI Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 uppercase font-mono block">Sensitivity</span>
              <span className="text-xl font-bold text-teal-700 font-mono tabular-nums">
                {(selectedMetric.sensitivity * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 uppercase font-mono block">Specificity</span>
              <span className="text-xl font-bold text-teal-700 font-mono tabular-nums">
                {(selectedMetric.specificity * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 uppercase font-mono block">Precision</span>
              <span className="text-xl font-bold text-teal-700 font-mono tabular-nums">
                {(selectedMetric.precision * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 uppercase font-mono block">Recall</span>
              <span className="text-xl font-bold text-teal-700 font-mono tabular-nums">
                {(selectedMetric.recall * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 uppercase font-mono block">F1 Score</span>
              <span className="text-xl font-bold text-teal-700 font-mono tabular-nums">
                {selectedMetric.f1_score.toFixed(3)}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 uppercase font-mono block">ROC-AUC</span>
              <span className="text-xl font-bold text-teal-700 font-mono tabular-nums">
                {selectedMetric.roc_auc.toFixed(3)}
              </span>
            </div>
          </div>

          {/* Dataset Provenance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800 block">Training Cohort Size</span>
              <span className="text-slate-600 mt-0.5 block">{selectedMetric.training_dataset_size}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800 block">Validation Set</span>
              <span className="text-slate-600 mt-0.5 block">{selectedMetric.validation_dataset_size}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800 block">External Test Benchmark</span>
              <span className="text-slate-600 mt-0.5 block">{selectedMetric.independent_test_dataset}</span>
            </div>
          </div>

          {/* Demographic Fairness & Bias Auditing (Section 18 requirement) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Demographic Equity & Stratified Subgroup Audits</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Fitzpatrick Skin Phototypes (I – VI) Audited
                </span>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  Evaluated across both lightly pigmented and heavily pigmented skin tones to ensure sensitivity does not drop across Fitzpatrick types V and VI.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Age Cohort & Camera Hardware Invariance
                </span>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  Audited across pediatric, adult, and geriatric demographic tiers, as well as multiple smartphone camera sensors and diverse illumination environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
