import React, { useState, useEffect } from 'react';
import {
  FileText,
  Mic,
  MicOff,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Clock,
  Activity
} from 'lucide-react';
import { submitSymptomAnalysis } from '../services/apiService';
import { ScreeningResult } from '../types';

interface ConcernViewProps {
  onComplete: (result: ScreeningResult) => void;
  consentAgreed: boolean;
  onOpenConsent: () => void;
  onNavigateToEmergency: () => void;
}

export const ConcernView: React.FC<ConcernViewProps> = ({
  onComplete,
  consentAgreed,
  onOpenConsent,
  onNavigateToEmergency
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('Several days to 2 weeks');
  const [associatedFactors, setAssociatedFactors] = useState('');
  const [category, setCategory] = useState('general');

  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live emergency red flag detection
  const [emergencyDetected, setEmergencyDetected] = useState(false);

  const EMERGENCY_WORDS = [
    'chest pain', 'heart attack', 'cant breathe', "can't breathe", 'shortness of breath',
    'loss of vision', 'sudden blind', 'stroke', 'face droop', 'slurred speech',
    'anaphylaxis', 'choking', 'suicide', 'self-harm'
  ];

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
    }
  }, []);

  useEffect(() => {
    const lower = symptoms.toLowerCase();
    const hasEmergency = EMERGENCY_WORDS.some((word) => lower.includes(word));
    setEmergencyDetected(hasEmergency);
  }, [symptoms]);

  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSymptoms(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error', err);
      setIsListening(false);
    }
  };

  const sampleConcerns = [
    'My skin has developed a dark asymmetrical patch that is slightly itchy.',
    'My voice has changed and sounds hoarse and raspy for 3 weeks.',
    'My gums are bleeding and feel swollen when brushing.',
    'My eyes are red, burning, and feel gritty with watery discharge.',
    'Severe sudden crushing chest pain and shortness of breath (Emergency test)'
  ];

  const handleSubmit = async () => {
    if (!consentAgreed) {
      onOpenConsent();
      return;
    }

    if (!symptoms.trim()) {
      setErrorMsg('Please enter or dictate a description of your symptoms.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const res = await submitSymptomAnalysis({
        symptoms,
        duration,
        associatedFactors,
        category
      });
      onComplete(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Symptom analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider flex-wrap">
          <span>Natural Language Triage</span>
          <span aria-hidden="true">·</span>
          <span>Multimodal Symptom Processing</span>
          <span aria-hidden="true">·</span>
          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono text-[10px]">
            Groq openai/gpt-oss-120b
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Describe Your Health Concern
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Provide detailed notes about what you are observing. Our Groq-accelerated clinical triage engine parses symptoms, screens for acute emergency indicators, and provides preliminary specialist routing.
        </p>
      </div>

      {/* Emergency Alert if red flags are detected in real-time */}
      {emergencyDetected && (
        <div className="p-5 bg-rose-600 text-white rounded-xl shadow-md space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-white" />
            <span>POTENTIAL ACUTE EMERGENCY DETECTED</span>
          </div>
          <p className="text-xs text-rose-100 leading-relaxed">
            Your reported symptoms contain emergency indicators (e.g. chest discomfort, vision loss, breathing difficulty, or stroke symptoms). AI screening cannot diagnose or manage emergency medical crises.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="tel:911"
              className="px-4 py-2 bg-white text-rose-700 font-bold text-xs rounded-lg shadow-xs hover:bg-rose-50 transition-colors"
            >
              Call 911 / 112 Immediately
            </a>
            <button
              onClick={onNavigateToEmergency}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              View Emergency Triage Guide
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="border border-slate-200 rounded-xl bg-white p-6 space-y-5 shadow-xs">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              What concern or symptom are you experiencing?
            </label>
            {speechSupported && (
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                  isListening
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5 text-rose-600" />
                    <span>Listening... (Click to stop)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-teal-600" />
                    <span>Dictate via Voice</span>
                  </>
                )}
              </button>
            )}
          </div>

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Type your concern in natural language, for example: 'My skin has an itchy red patch on my elbow that gets worse in winter', or 'I noticed a dark spot on my arm that looks asymmetrical'..."
            rows={4}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800 leading-relaxed"
          />
        </div>

        {/* Quick prompt suggestions */}
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Or Click a Sample Patient Query:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleConcerns.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSymptoms(s)}
                className="text-left text-[11px] py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
              >
                "{s}"
              </button>
            ))}
          </div>
        </div>

        {/* Additional Clinical Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Duration of Symptoms
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 3 days, 2 weeks, 6 months"
              className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Associated Triggers or Factors
            </label>
            <input
              type="text"
              value={associatedFactors}
              onChange={(e) => setAssociatedFactors(e.target.value)}
              placeholder="e.g. After sun exposure, eating sweets, talking"
              className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isAnalyzing || !symptoms.trim()}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 ${
              isAnalyzing || !symptoms.trim()
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
            }`}
          >
            {isAnalyzing ? (
              <span>Performing Natural Language Clinical Triage...</span>
            ) : (
              <>
                <span>Analyze Symptom Constellation & Route Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
