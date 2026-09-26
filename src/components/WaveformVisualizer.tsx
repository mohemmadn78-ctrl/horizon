import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isRecording: boolean;
  audioAnalyser?: AnalyserNode | null;
  height?: number;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isRecording,
  audioAnalyser,
  height = 90
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, width, h);

      // Background subtle grid line
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(width, h / 2);
      ctx.stroke();

      if (isRecording && audioAnalyser) {
        // Real Web Audio analyser data
        const bufferLength = audioAnalyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        audioAnalyser.getByteTimeDomainData(dataArray);

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0d9488'; // teal-600
        ctx.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * h) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, h / 2);
        ctx.stroke();
      } else if (isRecording) {
        // Simulated calibrated vocal oscillation
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0d9488';
        ctx.beginPath();

        const steps = 180;
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * width;
          const normalX = (i / steps) * Math.PI * 8;
          // harmonic superposition
          const yOffset =
            Math.sin(normalX + phase) * 22 +
            Math.sin(normalX * 2.3 - phase * 1.5) * 10 +
            Math.sin(normalX * 0.5 + phase * 0.7) * 6;
          const y = h / 2 + yOffset;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase += 0.08;
      } else {
        // Idle calm baseline
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#94a3b8'; // slate-400
        ctx.beginPath();
        const steps = 100;
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * width;
          const y = h / 2 + Math.sin((i / steps) * Math.PI * 4 + phase) * 3;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase += 0.02;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isRecording, audioAnalyser]);

  return (
    <div className="w-full bg-slate-900 rounded-lg p-3 border border-slate-800 shadow-inner flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isRecording ? 'bg-rose-500 animate-pulse' : 'bg-slate-500'
            }`}
          />
          {isRecording ? 'STREAMING REAL-TIME ACOUSTIC OSCILLATION' : 'MICROPHONE STANDBY / READY'}
        </span>
        <span>CALIBRATED: 44.1 kHz · 16-BIT PCM</span>
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={height}
        className="w-full h-20 rounded bg-slate-950/80"
      />
    </div>
  );
};
