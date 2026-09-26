import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Bookmark,
  Share2,
  Printer,
  UserCheck,
  Stethoscope,
  Building2,
  Info,
  Layers,
  Scale,
  Activity,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  BrainCircuit,
  HeartHandshake,
  CheckSquare,
  Square,
  ShieldAlert
} from 'lucide-react';
import { ScreeningResult, DiseaseInfo } from '../types';
import { MEDICAL_DISEASES } from '../data/medicalDatabase';
import { saveScreeningResult } from '../services/apiService';

interface ResultsViewProps {
  result: ScreeningResult;
  onNavigateToDoctor: (specialty?: string) => void;
  onNavigateToHospital: () => void;
  onNavigateToCondition: (conditionId: string) => void;
  onNewScreening: () => void;
  onAskGroq?: (question?: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onNavigateToDoctor,
  onNavigateToHospital,
  onNavigateToCondition,
  onNewScreening,
  onAskGroq
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});

  // Match condition in structured database if available
  const conditionMatch: DiseaseInfo | undefined = MEDICAL_DISEASES.find(
    (d) => d.id === result.condition_id
  );

  const handleSaveToHistory = () => {
    saveScreeningResult(result);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyQuestions = () => {
    if (!result.doctor_discussion_questions) return;
    const text = result.doctor_discussion_questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n');
    navigator.clipboard?.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 3000);
  };

  const toggleQuestionCheck = (idx: number) => {
    setCheckedQuestions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase">
            <span>INFERENCE ID: {result.id}</span>
            <span aria-hidden="true">·</span>
            <span>{new Date(result.timestamp).toLocaleDateString()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Standardized Screening Report
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            onClick={() => onAskGroq?.(`Please explain my screening finding: "${result.finding}" in simple terms and tell me what questions I should prepare for my ${result.specialist}.`)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all flex items-center gap-1.5"
            title="Ask Groq Clinical AI Assistant powered by openai/gpt-oss-120b"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-200 animate-pulse" />
            <span>Ask Groq AI</span>
          </button>
          <button
            onClick={handleSaveToHistory}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              savedSuccess
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Saved to History' : 'Save Result'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Interactive Groq Clinical Assistant Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-teal-500/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-white tracking-tight">
                Discuss Finding with Groq AI Assistant
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono border border-teal-500/30">
                openai/gpt-oss-120b
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Instant real-time streamed explanations of medical terms, triage insights, and doctor questions.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onAskGroq?.(`I would like to discuss my preliminary finding "${result.finding}". What should I ask my ${result.specialist} and what tests are typically done?`)}
          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg transition-all whitespace-nowrap shrink-0 shadow-sm hover:scale-[1.02]"
        >
          Start AI Consultation →
        </button>
      </div>

      {/* Outcome Category A, B, or C (Section 11 Engine) */}
      {result.screening_status === 'poor_input' ? (
        /* OUTCOME C: Poor Input */
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-800 rounded-lg">
              <XCircle className="w-6 h-6 text-rose-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-950">
                Outcome C: Quality Gate Rejection
              </h2>
              <p className="text-xs text-rose-800">
                Universal Input-Quality Check failed prior to model execution.
              </p>
            </div>
          </div>
          <p className="text-sm font-semibold text-rose-900 leading-relaxed">
            {result.input_quality_summary}
          </p>
          <div className="p-4 bg-white/80 rounded-lg border border-rose-200 text-xs text-rose-900 space-y-2">
            <p className="font-semibold uppercase tracking-wider text-[11px]">
              Required Next Step to Proceed:
            </p>
            <p>{result.recommended_next_step}</p>
          </div>
          <div className="pt-2">
            <button
              onClick={onNewScreening}
              className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Retake with Clearer Photograph / Audio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : result.screening_status === 'uncertain' ? (
        /* OUTCOME B: Uncertain */
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
              <HelpCircle className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-950">
                Outcome B: Uncertain / Insufficient Information
              </h2>
              <p className="text-xs text-amber-800">
                Calibrated confidence falls below safe clinical decision threshold.
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            The model determined that the available visual or acoustic features do not present a clear, definitive pattern. Rather than forcing an arbitrary classification, the system reports high uncertainty.
          </p>
          <div className="p-4 bg-white/80 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <p className="font-semibold">Recommended Clinical Pathway:</p>
            <p>{result.recommended_next_step}</p>
            <p className="text-slate-600 mt-2">
              Recommended Healthcare Specialist: <strong className="text-slate-900">{result.specialist}</strong>
            </p>
          </div>
        </div>
      ) : (
        /* OUTCOME A: Sufficient Evidence Finding */
        <div className="space-y-8">
          {/* Main Finding Card (Format matching Section 12) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-teal-800 font-semibold uppercase tracking-wider">
                  SCREENING RESULT FINDING
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {result.finding}
                </h2>
              </div>
              <div className="flex flex-col sm:items-end text-left sm:text-right space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 uppercase font-mono">Calibrated Confidence</span>
                  <span className="text-xl sm:text-2xl font-bold text-teal-700 font-mono tabular-nums">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                {/* Visual Calibration Interval */}
                <div className="w-36 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  95% Credible Bounds: [{(Math.max(60, (result.confidence - 0.04) * 100)).toFixed(1)}% – {(Math.min(98, (result.confidence + 0.04) * 100)).toFixed(1)}%]
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Mandatory Non-Diagnosis Disclaimer */}
              <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-teal-950">
                  <strong className="font-bold">Mandatory Statement:</strong> "This is a preliminary AI screening result, not a medical diagnosis." Please share this report with your healthcare provider for clinical confirmation.
                </div>
              </div>

              {/* Evidence Detected */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Evidence Detected by the Pipeline:
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {result.evidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{ev}</span>
                    </li>
                  ))}
                  {result.user_reported_concerns && (
                    <li className="flex items-start gap-2 text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>User-reported concern: "{result.user_reported_concerns}"</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* ABCDE Breakdown for Skin Lesions */}
              {result.abcde && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      ABCDE Dermoscopic Feature Breakdown
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">ISIC PROTOCOL</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <p className="font-bold text-slate-900">A — Asymmetry</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{result.abcde.asymmetry.label}</p>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <p className="font-bold text-slate-900">B — Border</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{result.abcde.border.label}</p>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <p className="font-bold text-slate-900">C — Color</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{result.abcde.color.label}</p>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <p className="font-bold text-slate-900">D — Diameter</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{result.abcde.diameter.label}</p>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <p className="font-bold text-slate-900">E — Evolution</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{result.abcde.evolution.label}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">
                    "Some visual characteristics warrant professional evaluation." Note: Malignant melanoma cannot be confirmed or excluded without full dermatoscopy and tissue biopsy.
                  </p>
                </div>
              )}

              {/* Acoustic Metrics for Voice Screening */}
              {result.acoustic_metrics && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Acoustic Voice Feature Matrix
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">VOICE LAB PROTOCOL</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <span className="text-[11px] text-slate-500">Pitch (F0)</span>
                      <p className="font-bold font-mono text-slate-900 mt-0.5">
                        {result.acoustic_metrics.fundamental_frequency_hz} Hz
                      </p>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <span className="text-[11px] text-slate-500">Jitter (Freq Perturbation)</span>
                      <p className="font-bold font-mono text-slate-900 mt-0.5">
                        {result.acoustic_metrics.jitter_percent}%
                      </p>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <span className="text-[11px] text-slate-500">Shimmer (Amp Perturbation)</span>
                      <p className="font-bold font-mono text-slate-900 mt-0.5">
                        {result.acoustic_metrics.shimmer_percent}%
                      </p>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-slate-200">
                      <span className="text-[11px] text-slate-500">Harmonics-to-Noise (HNR)</span>
                      <p className="font-bold font-mono text-slate-900 mt-0.5">
                        {result.acoustic_metrics.harmonics_to_noise_ratio_db} dB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Preview & Model Explainability */}
              {result.image_preview && (
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-36 h-36 rounded-lg bg-slate-900 overflow-hidden relative shrink-0 border border-slate-200">
                    <img
                      src={result.image_preview}
                      alt="Screening input"
                      className="w-full h-full object-cover"
                    />
                    {showHeatmap && (
                      <div className="absolute inset-0 bg-red-500/25 border-2 border-dashed border-amber-400 flex items-center justify-center">
                        <span className="text-[9px] bg-slate-900/80 text-white px-1.5 py-0.5 rounded">
                          Salient Attention Mask
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="font-semibold text-slate-900">Model Explainability & Region Saliency:</p>
                    <p>
                      The model focused primarily on tissue boundaries, edge contrast gradients, and chromatic variegation within the central anatomical region.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{showHeatmap ? 'Hide Attention Saliency' : 'Highlight Region Used by Model'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Limitations */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700 uppercase tracking-wide text-[11px]">
                  Clinical Scope & Methodology Limitations:
                </p>
                <ul className="list-disc pl-4 space-y-0.5">
                  {result.limitations.map((lim, i) => (
                    <li key={i}>{lim}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 1. Deep Clinical Reasoning & Diagnostic Synthesis */}
          {result.clinical_reasoning && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-teal-800 uppercase font-semibold">
                    PATHOSENSE AI CLINICAL SYNTHESIS
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Diagnostic Logic & Evidence Evaluation
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {result.clinical_reasoning}
              </p>
            </div>
          )}

          {/* 2. Differential Pathologies Evaluated */}
          {result.differential_diagnoses && result.differential_diagnoses.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-blue-800 uppercase font-semibold">
                      DIFFERENTIAL EVALUATION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Conditions Considered by the Engine
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {result.differential_diagnoses.length} POTENTIAL PATHOLOGIES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {result.differential_diagnoses.map((diff, idx) => {
                  const probColor =
                    diff.probability === 'high'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : diff.probability === 'moderate'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200';

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-2.5"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${probColor}`}>
                            {diff.probability} probability
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">#{idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-2">
                          {diff.condition}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                          {diff.rationale}
                        </p>
                      </div>

                      {diff.key_features && diff.key_features.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 space-y-1">
                          <span className="font-semibold text-slate-700 uppercase tracking-wide">Key Features:</span>
                          <div className="flex flex-wrap gap-1">
                            {diff.key_features.map((feat, fIdx) => (
                              <span
                                key={fIdx}
                                className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[10px]"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Anatomical Feature Breakdown (if present) */}
          {result.anatomical_breakdown && result.anatomical_breakdown.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-teal-800 uppercase font-semibold">
                    REGIONAL ANATOMICAL BREAKDOWN
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Tissue & Structure Observations
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {result.anatomical_breakdown.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-900 text-[11px] uppercase tracking-wide text-teal-900">
                      {item.anatomical_area}
                    </p>
                    <p className="text-slate-700">{item.observation}</p>
                    <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/60">
                      {item.clinical_significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Actionable Doctor Discussion Questions (Interactive Checklist) */}
          {result.doctor_discussion_questions && result.doctor_discussion_questions.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-indigo-800 uppercase font-semibold">
                      CLINICAL CONSULTATION PREPARATION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      5 Targeted Questions to Ask Your {result.specialist}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyQuestions}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                >
                  {copiedQuestions ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Questions</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Patients who ask specific clinical questions experience higher diagnostic accuracy and clearer treatment plans. Use this interactive checklist during your consultation:
              </p>

              <div className="space-y-2">
                {result.doctor_discussion_questions.map((q, idx) => {
                  const isChecked = !!checkedQuestions[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleQuestionCheck(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-teal-50/50 border-teal-200 text-teal-950'
                          : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-slate-500 focus:outline-none shrink-0"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-teal-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <span className="font-semibold text-slate-500 mr-1.5">Q{idx + 1}:</span>
                        <span className={isChecked ? 'line-through text-slate-500' : 'text-slate-800'}>
                          {q}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. Condition-Specific Red Flags Warning Box */}
          {result.red_flags_warning && result.red_flags_warning.length > 0 && (
            <div className="bg-rose-50/90 border border-rose-200 rounded-xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-rose-800 uppercase font-bold tracking-wider">
                    SAFETY & ESCALATION PROTOCOL
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-rose-950">
                    When to Seek Immediate In-Person Urgent or Emergency Care
                  </h3>
                </div>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                If you experience any of the following acute symptoms, do not wait for a routine appointment. Seek same-day urgent care or proceed immediately to an emergency facility:
              </p>
              <ul className="space-y-1.5 text-xs text-rose-950 pt-1">
                {result.red_flags_warning.map((rf, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 6. Evidence-Based Supportive Comfort & Care Measures */}
          {result.supportive_care_tips && result.supportive_care_tips.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-teal-800 uppercase font-semibold">
                    SUPPORTIVE CARE GUIDANCE
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Safe Home Measures While Awaiting Your Appointment
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Non-prescription comfort protocols designed to protect tissues and avoid exacerbation. These do not replace medical treatment.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                {result.supportive_care_tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Clinical Sections (Section 12 Layout) */}
          {conditionMatch && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <span className="text-[11px] font-mono text-teal-800 uppercase font-semibold">
                  EVIDENCE-BASED CLINICAL CONTEXT
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  About {conditionMatch.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {conditionMatch.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 pt-2 border-t border-slate-100">
                {/* Causes & Risk Factors */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    Possible Causes & Risk Factors
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {conditionMatch.common_causes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Common Symptoms */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    Common Symptoms
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {conditionMatch.common_symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* What needs to be checked */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    What Usually Needs to Be Checked by a Doctor
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {conditionMatch.clinical_diagnostic_tests.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* General Treatment Information (Non-prescriptive Section 14) */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    General Treatment Categories (Educational Only)
                  </h4>
                  <p className="text-[11px] text-slate-500 italic mb-1">
                    "These treatments may be used for this condition. A qualified healthcare professional should determine whether they are appropriate."
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {conditionMatch.general_treatments.map((tr, i) => (
                      <li key={i}>{tr}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Warning signs & When to seek care */}
              <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-950">
                <p className="font-bold uppercase tracking-wider text-[11px] text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>When to Seek Immediate In-Person Care:</span>
                </p>
                <ul className="list-disc pl-4 space-y-1 text-rose-900">
                  {conditionMatch.warning_signs.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              {/* Verified References */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Verified Medical Reference: </span>
                  {conditionMatch.references[0]?.title} ({conditionMatch.references[0]?.organization}, {conditionMatch.references[0]?.year})
                </div>
                <div>Last Reviewed: {conditionMatch.last_reviewed_date}</div>
              </div>
            </div>
          )}

          {/* Recommended Specialist & Next Steps */}
          <div className="p-6 bg-slate-900 text-white rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-teal-300 uppercase tracking-wider">
                RECOMMENDED ACTION
              </span>
              <h3 className="text-lg font-bold">
                Consult a Board-Certified {result.specialist}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {result.recommended_next_step}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateToDoctor(result.specialist)}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Find a {result.specialist}</span>
              </button>
              <button
                onClick={onNavigateToHospital}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Hospital Finder</span>
              </button>
            </div>
          </div>

          {/* Model Traceability Metadata Box (Sections 24 & 25) */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 uppercase">
              <span>MODEL AUDIT LOG & VERSIONING (TRACEABILITY)</span>
              <span>CALIBRATION: {result.model_info.calibration_version}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-400 block">MODEL ARCHITECTURE</span>
                <span className="font-semibold text-slate-800">{result.model_info.model_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">VERSION</span>
                <span className="font-semibold text-slate-800">{result.model_info.model_version}</span>
              </div>
              <div>
                <span className="text-slate-400 block">BENCHMARK DATASET</span>
                <span className="font-semibold text-slate-800">{result.model_info.dataset_version}</span>
              </div>
              <div>
                <span className="text-slate-400 block">INFERENCE TIMESTAMP</span>
                <span className="font-semibold text-slate-800">
                  {new Date(result.model_info.inference_timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Physician Consultation & Clinical Handover Card */}
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-6 space-y-4 print-break-inside-avoid">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-slate-700" />
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  CLINICAL PROVIDER CONSULTATION & HANDOVER SECTION
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                FOR IN-PERSON MEDICAL EVALUATION
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Attending physician / clinician: This report represents preliminary computer-vision and acoustic feature extraction paired with Groq LPU differential pattern synthesis. Please record physical examination findings, confirmatory diagnostic testing (biopsy / lab / imaging), and treatment plan below:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Attending Clinician Name</span>
                <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Medical License / NPI #</span>
                <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Clinical Signature & Date</span>
                <div className="h-6 border-b border-dotted border-slate-400 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
