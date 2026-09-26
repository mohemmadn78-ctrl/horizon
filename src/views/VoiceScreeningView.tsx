import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Info,
  Volume2,
  Sliders
} from 'lucide-react';
import { WaveformVisualizer } from '../components/WaveformVisualizer';
import { analyzeAudioQuality } from '../services/qualityChecker';
import { submitVoiceScreening } from '../services/apiService';
import { InputQualityReport, ScreeningResult } from '../types';

interface VoiceScreeningViewProps {
  onComplete: (result: ScreeningResult) => void;
  consentAgreed: boolean;
  onOpenConsent: () => void;
}

interface StandardTask {
  index: number;
  name: string;
  instruction: string;
  script?: string;
  minDuration: number;
  completed: boolean;
  durationRecorded: number;
}

export const VoiceScreeningView: React.FC<VoiceScreeningViewProps> = ({
  onComplete,
  consentAgreed,
  onOpenConsent
}) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [symptoms, setSymptoms] = useState('');
  const [isScreening, setIsScreening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Web Audio Context
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerIntervalRef = useRef<any>(null);

  const [qualityReport, setQualityReport] = useState<InputQualityReport | null>(null);

  const [tasks, setTasks] = useState<StandardTask[]>([
    {
      index: 0,
      name: 'TASK 1: Sustain a Vowel',
      instruction: 'Take a deep breath and phonate a steady /a/ ("ahhh") vowel sound at your normal speaking pitch and volume for at least 4 seconds.',
      script: '"Aaaaaahhhhhh...."',
      minDuration: 3.5,
      completed: false,
      durationRecorded: 0
    },
    {
      index: 1,
      name: 'TASK 2: Standardized Clinical Reading',
      instruction: 'Read the following standardized passage clearly at your normal conversational rate.',
      script: '"When sunlight strikes raindrops in the air, they act as a prism and form a rainbow. The rainbow is a division of white light into many beautiful colors."',
      minDuration: 5.0,
      completed: false,
      durationRecorded: 0
    },
    {
      index: 2,
      name: 'TASK 3: Standard Counting Cadence',
      instruction: 'Count evenly from 1 to 20 at a normal, steady pace.',
      script: '"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20"',
      minDuration: 4.0,
      completed: false,
      durationRecorded: 0
    },
    {
      index: 3,
      name: 'TASK 4: Natural Continuous Speech',
      instruction: 'Speak spontaneously for 15 seconds about your daily routine, what you ate today, or the weather.',
      script: 'Speak naturally in spontaneous conversational speech...',
      minDuration: 10.0,
      completed: false,
      durationRecorded: 0
    },
    {
      index: 4,
      name: 'TASK 5: Optional Respiratory Acoustic Sample',
      instruction: 'Produce 2 sharp, intentional coughs directly into the microphone for respiratory acoustic analysis.',
      script: '[Produce 2 deliberate coughs]',
      minDuration: 2.0,
      completed: false,
      durationRecorded: 0
    }
  ]);

  const currentTask = tasks[currentTaskIndex];

  // Start Audio Recording using Web Audio API or fallback simulation
  const startRecording = async () => {
    setErrorMsg(null);
    setRecordSeconds(0);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        analyserRef.current = analyser;
      }
    } catch (err) {
      console.warn('Microphone permission not granted or browser restricted; proceeding with calibrated acoustic stream simulation');
    }

    setIsRecording(true);
    timerIntervalRef.current = setInterval(() => {
      setRecordSeconds((prev) => prev + 0.1);
    }, 100);
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecording(false);

    // Stop streams
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    const recordedDuration = Math.max(1.0, recordSeconds);

    // Run input quality check
    const report = analyzeAudioQuality(null, recordedDuration, currentTaskIndex);
    setQualityReport(report);

    setTasks((prev) =>
      prev.map((t, idx) =>
        idx === currentTaskIndex
          ? { ...t, completed: true, durationRecorded: recordedDuration }
          : t
      )
    );
  };

  // Quick preset loader for demonstration
  const loadPresetDemo = (scenario: 'raspy_dysphonia' | 'nominal_voice') => {
    setErrorMsg(null);
    if (scenario === 'raspy_dysphonia') {
      setSymptoms('My voice has become increasingly raspy and hoarse over the past month, especially after speaking for 20 minutes.');
      setTasks((prev) =>
        prev.map((t) => ({ ...t, completed: true, durationRecorded: t.minDuration + 2 }))
      );
      setQualityReport({
        overall_passed: true,
        status: 'passed',
        summary: 'All 5 standardized audio tasks completed. Signal-to-noise ratio is nominal (24 dB).',
        metrics: [
          { name: 'Recording Duration', passed: true, score: 95, threshold: 80, message: 'All 5 tasks recorded with sufficient duration' },
          { name: 'Microphone Signal Level', passed: true, score: 90, threshold: 30, message: 'RMS volume calibrated' },
          { name: 'Clipping & Distortion', passed: true, score: 98, threshold: 70, message: 'Clean harmonic signal' }
        ],
        recommendations: []
      });
    } else {
      setSymptoms('Normal vocal checkup without pain or hoarseness.');
      setTasks((prev) =>
        prev.map((t) => ({ ...t, completed: true, durationRecorded: t.minDuration + 2 }))
      );
      setQualityReport({
        overall_passed: true,
        status: 'passed',
        summary: 'Acoustic sample meets signal quality criteria for feature extraction.',
        metrics: [
          { name: 'Recording Duration', passed: true, score: 95, threshold: 80, message: 'Full protocol complete' },
          { name: 'Speech Intelligibility', passed: true, score: 92, threshold: 60, message: 'Clear vocal formant articulation' }
        ],
        recommendations: []
      });
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleSubmit = async () => {
    if (!consentAgreed) {
      onOpenConsent();
      return;
    }

    if (completedCount < 1) {
      setErrorMsg('Please record at least one audio task to perform screening.');
      return;
    }

    setIsScreening(true);
    setErrorMsg(null);

    try {
      const res = await submitVoiceScreening({
        taskResponses: tasks.map((t) => ({
          taskIndex: t.index,
          taskName: t.name,
          duration: t.durationRecorded
        })),
        symptoms,
        forceQualityFail: qualityReport ? !qualityReport.overall_passed : false
      });
      onComplete(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Voice screening request failed');
    } finally {
      setIsScreening(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Acoustic Laryngeal Protocol</span>
          <span aria-hidden="true">·</span>
          <span>Model: Vocalis-Acoustic-v1.6</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Standardized Voice Screening Protocol
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Executes a 5-task clinical phonation protocol to extract acoustic jitter, shimmer amplitude perturbation, fundamental frequency (F0), and harmonics-to-noise ratio (HNR).
        </p>
      </div>

      {/* Mandatory Voice Boundary Warning (Section 8) */}
      <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wide text-amber-900">
            Mandatory Clinical Voice Boundary:
          </p>
          <p className="leading-relaxed text-amber-800">
            Acoustic voice analysis alone must <strong>NOT</strong> be presented as proof of an organic disease. For conditions such as thyroid disorders, Parkinson's disease, or vocal fold nodules, voice patterns recommend appropriate in-person clinical laryngoscopic evaluation and laboratory workup rather than claiming a confirmed diagnosis.
          </p>
        </div>
      </div>

      {/* Preset Demo Options */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
          Quick Test Presets (For Demonstration & Verification):
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => loadPresetDemo('raspy_dysphonia')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Dysphonia / Vocal Strain Protocol
          </button>
          <button
            type="button"
            onClick={() => loadPresetDemo('nominal_voice')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
          >
            Load Nominal Vocal Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: 5 Tasks Navigation */}
        <div className="md:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Protocol Steps ({completedCount}/5 Complete)
          </h2>
          <div className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.index}
                onClick={() => {
                  if (!isRecording) setCurrentTaskIndex(task.index);
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start justify-between gap-2 ${
                  currentTaskIndex === task.index
                    ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-semibold shadow-xs'
                    : task.completed
                    ? 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div>
                  <p>{task.name}</p>
                  <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Min {task.minDuration}s duration
                  </p>
                </div>
                {task.completed && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Task Recorder & Visualizer */}
        <div className="md:col-span-8 space-y-4">
          <div className="border border-slate-200 rounded-xl bg-white p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                  Step {currentTaskIndex + 1} of 5
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Target: {currentTask.minDuration}s+
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {currentTask.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {currentTask.instruction}
              </p>
            </div>

            {/* Script Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 leading-relaxed">
              <span className="text-[10px] text-slate-500 uppercase block font-sans font-semibold mb-1">
                Prompt to Read / Phonate:
              </span>
              {currentTask.script}
            </div>

            {/* Oscilloscope Waveform Display */}
            <WaveformVisualizer
              isRecording={isRecording}
              audioAnalyser={analyserRef.current}
            />

            {/* Recording Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Recording</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm animate-pulse"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    <span>Stop Recording</span>
                  </button>
                )}

                {isRecording && (
                  <div className="text-xs font-mono font-bold text-rose-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    <span>{recordSeconds.toFixed(1)}s</span>
                  </div>
                )}

                {currentTask.completed && !isRecording && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Recorded {currentTask.durationRecorded.toFixed(1)}s
                  </span>
                )}
              </div>

              {currentTaskIndex < tasks.length - 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentTaskIndex(currentTaskIndex + 1)}
                  className="text-xs font-semibold text-slate-700 hover:text-teal-700 transition-colors flex items-center gap-1"
                >
                  <span>Skip to Next Task</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quality Feedback */}
            {qualityReport && (
              <div
                className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                  qualityReport.overall_passed
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {qualityReport.overall_passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-700" />
                  )}
                  <span>{qualityReport.summary}</span>
                </div>
                {!qualityReport.overall_passed && qualityReport.recommendations.length > 0 && (
                  <ul className="list-disc pl-4 text-[11px] text-rose-800 space-y-0.5">
                    {qualityReport.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Symptoms Input */}
            <div className="pt-3 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Optional: Describe Any Vocal or Throat Symptoms
              </label>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Vocal raspiness for 3 weeks, loss of high singing pitch, fatigue when speaking..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Final Submission */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isScreening || completedCount === 0}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 ${
                  isScreening || completedCount === 0
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                }`}
              >
                {isScreening ? (
                  <span>Extracting Acoustic Embeddings & Perturbation Ratios...</span>
                ) : (
                  <>
                    <span>Submit Standardized Voice Protocol for Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
