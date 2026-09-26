import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Sparkles, ChevronRight, Zap } from 'lucide-react';

interface TelemetryRibbonProps {
  onOpenGroq?: () => void;
  onNavigateToAboutAI?: () => void;
}

export const TelemetryRibbon: React.FC<TelemetryRibbonProps> = ({
  onOpenGroq,
  onNavigateToAboutAI
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().slice(11, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-[11px] font-mono select-none px-4 py-1.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        {/* Left Telemetry Cluster */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM CALIBRATED
          </span>

          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">|</span>

          <span className="hidden md:flex items-center gap-1 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>DUAL PIPELINE: VISION + GROQ LPU (120B)</span>
          </span>

          <span className="text-slate-600 hidden lg:inline" aria-hidden="true">|</span>

          <span className="hidden lg:flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>EPHEMERAL RAM · ZERO CLOUD RETENTION</span>
          </span>
        </div>

        {/* Right Telemetry Controls */}
        <div className="flex items-center gap-3 ml-auto text-slate-400">
          <span className="hidden sm:inline tabular-nums text-slate-400">
            {currentTime}
          </span>

          <button
            onClick={onNavigateToAboutAI}
            className="hidden sm:flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
          >
            <span>MODELS & ACCURACY</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={onOpenGroq}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-700/60 transition-colors text-[10px] uppercase font-bold tracking-wider cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-teal-300" />
            <span>GROQ LPU COPILOT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
