import React, { useState } from 'react';
import {
  Camera,
  Eye,
  Smile,
  Mic,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Scan
} from 'lucide-react';
import { ASSET_IMAGES } from '../services/apiService';

interface ClinicalSimulationConsoleProps {
  onSelectModality: (view: string) => void;
  onOpenGroqAssistant: (prompt?: string) => void;
}

type SimulationModality = 'skin' | 'eye' | 'dental' | 'voice';

export const ClinicalSimulationConsole: React.FC<ClinicalSimulationConsoleProps> = ({
  onSelectModality,
  onOpenGroqAssistant
}) => {
  const [activeTab, setActiveTab] = useState<SimulationModality>('skin');
  const [showOverlay, setShowOverlay] = useState(true);

  const simulationData = {
    skin: {
      title: 'Dermatological Dermoscopy & ABCDE Computer Vision',
      viewTarget: 'skin_screening',
      image: ASSET_IMAGES.skin,
      primaryDetection: 'Pigmented Asymmetric Melanocytic Lesion',
      confidence: 0.84,
      uncertaintyRange: '81% – 87% (95% Bayesian Credible Interval)',
      groqReasoning:
        'Bi-axial contour irregularity and localized pigment clumping along the superior margin indicate architectural disorder. Differential favors atypical dysplastic nevus over superficial spreading melanoma.',
      metrics: [
        { label: 'Asymmetry Index', value: '0.82', normal: '< 0.50', status: 'elevated' },
        { label: 'Border Scalloping', value: '0.79', normal: '< 0.40', status: 'elevated' },
        { label: 'Color Variegation', value: '0.88', normal: '< 0.55', status: 'elevated' },
        { label: 'Estimated Diameter', value: '6.4 mm', normal: '< 6.0 mm', status: 'elevated' }
      ],
      differential: [
        { name: 'Dysplastic / Atypical Nevus', prob: '68%', highlight: true },
        { name: 'Superficial Spreading Melanoma', prob: '24%', highlight: false },
        { name: 'Pigmented Seborrheic Keratosis', prob: '8%', highlight: false }
      ]
    },
    eye: {
      title: 'Anterior Segment Ocular Biomarker Mapping',
      viewTarget: 'eye_screening',
      image: ASSET_IMAGES.eye,
      primaryDetection: 'Bulbar Conjunctival Vascular Injection & Hyperaemia',
      confidence: 0.86,
      uncertaintyRange: '83% – 89% (95% Bayesian Credible Interval)',
      groqReasoning:
        'Vascular engorgement is diffuse and superficial without localized ciliary flush or corneal opacity, consistent with acute conjunctivitis rather than anterior uveitis or corneal ulcer.',
      metrics: [
        { label: 'Vascular Dilation', value: '76.4 %', normal: '< 20.0 %', status: 'elevated' },
        { label: 'Corneal Clarity', value: '99.2 %', normal: '> 95.0 %', status: 'nominal' },
        { label: 'Limbus Scleral Ratio', value: '1.42', normal: '1.1 – 1.6', status: 'nominal' },
        { label: 'Eyelid Margin Score', value: '0.34', normal: '< 0.30', status: 'moderate' }
      ],
      differential: [
        { name: 'Acute Viral Conjunctivitis', prob: '62%', highlight: true },
        { name: 'Seasonal Allergic Conjunctivitis', prob: '29%', highlight: false },
        { name: 'Bacterial Conjunctivitis', prob: '9%', highlight: false }
      ]
    },
    dental: {
      title: 'Oral Mucosal & Cervical Enamel Spectrophotometry',
      viewTarget: 'dental_screening',
      image: ASSET_IMAGES.dental,
      primaryDetection: 'Supragingival Biofilm & Marginal Gingival Erythema',
      confidence: 0.85,
      uncertaintyRange: '82% – 88% (95% Bayesian Credible Interval)',
      groqReasoning:
        'Erythema is strictly confined to free gingival margins and interdental papillae with visible cervical biofilm. No pathological mobile tooth displacement or gross recession.',
      metrics: [
        { label: 'Plaque Area Coverage', value: '38.2 %', normal: '< 15.0 %', status: 'elevated' },
        { label: 'Marginal Erythema Index', value: '2.4 / 3.0', normal: '< 1.0', status: 'elevated' },
        { label: 'Enamel Demineralization', value: '0.22', normal: '< 0.15', status: 'moderate' },
        { label: 'Interdental Integrity', value: 'Preserved', normal: 'Preserved', status: 'nominal' }
      ],
      differential: [
        { name: 'Plaque-Induced Gingivitis', prob: '74%', highlight: true },
        { name: 'Incipient Cervical Caries', prob: '19%', highlight: false },
        { name: 'Early Chronic Periodontitis', prob: '7%', highlight: false }
      ]
    },
    voice: {
      title: 'Acoustic Dysphonia & Transglottic Aerodynamic DSP',
      viewTarget: 'voice_screening',
      image: ASSET_IMAGES.voice,
      primaryDetection: 'Acoustic Perturbation with Elevated Jitter & Shimmer',
      confidence: 0.84,
      uncertaintyRange: '80% – 87% (95% Bayesian Credible Interval)',
      groqReasoning:
        'Aperiodicity in cycle-to-cycle phonation periods (Jitter 1.84%) and transglottic turbulence (HNR 16.4 dB) reflect mucosal wave damping indicative of vocal strain or early inflammation.',
      metrics: [
        { label: 'Fundamental F0', value: '178 Hz', normal: '160 – 240 Hz', status: 'nominal' },
        { label: 'Acoustic Jitter', value: '1.84 %', normal: '< 1.04 %', status: 'elevated' },
        { label: 'Acoustic Shimmer', value: '4.92 %', normal: '< 3.80 %', status: 'elevated' },
        { label: 'Harmonics-to-Noise', value: '16.4 dB', normal: '> 20.0 dB', status: 'elevated' }
      ],
      differential: [
        { name: 'Muscle Tension Dysphonia (MTD)', prob: '58%', highlight: true },
        { name: 'Acute Viral Laryngitis', prob: '32%', highlight: false },
        { name: 'Early Vocal Fold Nodules', prob: '10%', highlight: false }
      ]
    }
  };

  const current = simulationData[activeTab];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-7 text-white shadow-xl overflow-hidden relative">
      {/* Background Micro Grid Glow */}
      <div className="absolute inset-0 bg-biomedical-grid-dark pointer-events-none opacity-40"></div>

      {/* Console Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
            <Scan className="w-4 h-4 animate-pulse" />
            <span>INTERACTIVE CLINICAL SIMULATION CONSOLE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Experience Dual-Engine Diagnostic Synthesis
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Inspect real-time multimodal feature extraction, Bayesian uncertainty calibration, and Groq LPU differential synthesis.
          </p>
        </div>

        {/* Modality Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('skin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'skin'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Skin ABCDE</span>
          </button>

          <button
            onClick={() => setActiveTab('eye')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'eye'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Anterior Eye</span>
          </button>

          <button
            onClick={() => setActiveTab('dental')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'dental'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Oral & Dental</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Acoustic Voice</span>
          </button>
        </div>
      </div>

      {/* Main Console Body: Split Viewport & Telemetry */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Viewport Stage (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 aspect-4/3 group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Simulated Feature Contour Overlay */}
            {showOverlay && (
              <div className="absolute inset-0 pointer-events-none border-2 border-teal-400/40 m-4 rounded-lg bg-teal-500/10 flex flex-col justify-between p-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-teal-300 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-xs w-max">
                  <span>FOV: CALIBRATED 1024x1024</span>
                </div>
                <div className="text-[10px] font-mono text-teal-300 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-xs w-max self-end">
                  <span>ROI: TISSUE BOUNDARY DETECTED</span>
                </div>
              </div>
            )}

            {/* Toggle Overlay Button */}
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-slate-900/90 text-[10px] font-mono text-slate-300 hover:text-white border border-slate-700 backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-3 h-3 text-teal-400" />
              <span>{showOverlay ? 'Hide Feature Grid' : 'Show Feature Grid'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span>CONFIDENCE CALIBRATION</span>
              <span className="text-teal-400 font-bold tabular-nums">{(current.confidence * 100).toFixed(1)}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                style={{ width: `${current.confidence * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 font-mono pt-1">
              Uncertainty: {current.uncertaintyRange}
            </p>
          </div>
        </div>

        {/* Right Telemetry & Reasoning Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Finding Banner */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-teal-400 uppercase font-bold tracking-wider">
                PRIMARY DETECTED CLINICAL PATTERN
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                CALIBRATED MATCH
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              {current.primaryDetection}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
              <strong className="text-teal-300 font-medium">Groq LPU Reasoning: </strong>
              {current.groqReasoning}
            </p>
          </div>

          {/* Granular Physiological Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {current.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1"
              >
                <span className="text-[10px] font-mono text-slate-400 uppercase block truncate">
                  {metric.label}
                </span>
                <span className="text-base font-mono font-bold text-white block tabular-nums">
                  {metric.value}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  Ref: {metric.normal}
                </span>
              </div>
            ))}
          </div>

          {/* Differential Diagnoses Matrix */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
              DIFFERENTIAL PATHOLOGY SYNTHESIS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {current.differential.map((diff, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                    diff.highlight
                      ? 'bg-teal-950/40 border-teal-700/60 text-teal-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="font-medium truncate">{diff.name}</span>
                  <span className="font-mono text-[11px] font-bold shrink-0">{diff.prob}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Execution Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() =>
                onOpenGroqAssistant(
                  `Please explain how PathoSense evaluates ${current.title} and what clinical evidence is required.`
                )
              }
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Groq 120B about this protocol</span>
            </button>

            <button
              onClick={() => onSelectModality(current.viewTarget)}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Live {activeTab.toUpperCase()} Protocol</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
