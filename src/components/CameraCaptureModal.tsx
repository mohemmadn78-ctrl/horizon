import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  RotateCcw,
  Check,
  X,
  FlipHorizontal,
  AlertCircle,
  Upload,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
  title?: string;
  screeningType?: 'skin' | 'eye' | 'dental';
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  title = 'Capture Photograph',
  screeningType = 'skin'
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nativeFileInputRef = useRef<HTMLInputElement | null>(null);

  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Stop video stream cleanly
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Check available video devices
  const checkDevices = useCallback(async () => {
    try {
      if (navigator.mediaDevices?.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      }
    } catch {
      // Ignore device enumeration errors
    }
  }, []);

  // Start video stream
  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    setIsInitializing(true);
    setCameraError(null);
    stopStream();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support in-app camera access. Please use the device camera or file upload.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsInitializing(false);
    } catch (err: any) {
      console.warn('Camera initialization error:', err);
      // Try fallback to any video stream without facingMode constraint
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        streamRef.current = fallbackStream;
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          await videoRef.current.play();
        }
        setIsInitializing(false);
      } catch (fallbackErr: any) {
        setIsInitializing(false);
        const name = fallbackErr?.name || err?.name;
        if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
          setCameraError('Camera access was denied. Please allow camera permissions in your browser settings, or use the native camera option below.');
        } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
          setCameraError('No camera found on this device. You can upload an image file or take a picture using your mobile device.');
        } else {
          setCameraError('Unable to open camera stream. Please try using device camera capture or uploading an existing photo.');
        }
      }
    }
  }, [stopStream]);

  // Initial mount / open handling
  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      setCameraError(null);
      checkDevices();
      startCamera(facingMode);
    } else {
      stopStream();
      setCapturedImage(null);
    }

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode, checkDevices, startCamera, stopStream]);

  // Flip camera between front and back
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  // Capture frame from video feed
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If front camera, mirror image for natural selfie orientation
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(dataUrl);
    stopStream();
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(facingMode);
  };

  // Confirm photo
  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  // Native mobile camera fallback handler
  const handleNativeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onCapture(dataUrl);
      onClose();
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90 text-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm tracking-tight text-white">{title}</h3>
              <p className="text-[11px] text-slate-400">
                {screeningType === 'skin' && 'Position lesion centrally in direct, even lighting'}
                {screeningType === 'eye' && 'Align the eye gently open without direct bright glare'}
                {screeningType === 'dental' && 'Gently smile with teeth and gumlines clearly visible'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="relative flex-1 bg-black min-h-[360px] max-h-[520px] flex items-center justify-center overflow-hidden">
          {capturedImage ? (
            /* Snapshot Review View */
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <img
                src={capturedImage}
                alt="Captured preview"
                className="max-h-[500px] w-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1.5 backdrop-blur-sm">
                <Check className="w-3.5 h-3.5" /> Photo Captured
              </div>
            </div>
          ) : cameraError ? (
            /* Error & Fallback View */
            <div className="p-8 text-center max-w-md space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">Camera Unavailable</p>
                <p className="text-xs text-slate-300 leading-relaxed">{cameraError}</p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => nativeFileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 shadow"
                >
                  <Camera className="w-4 h-4" /> Open Device Camera / Choose File
                </button>
                <button
                  onClick={() => startCamera(facingMode)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retry Camera
                </button>
              </div>
            </div>
          ) : (
            /* Live Camera Feed View */
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover max-h-[500px] ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {isInitializing && (
                <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center text-white gap-2">
                  <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-slate-300">Activating camera sensor...</p>
                </div>
              )}

              {/* Viewfinder Reticle Overlay */}
              {!isInitializing && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {screeningType === 'skin' && (
                    <div className="w-56 h-56 rounded-full border-2 border-dashed border-teal-400/80 shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center justify-center">
                      <div className="w-6 h-6 border-t-2 border-l-2 border-teal-300/80 absolute top-3 left-3" />
                      <div className="w-6 h-6 border-t-2 border-r-2 border-teal-300/80 absolute top-3 right-3" />
                      <div className="w-6 h-6 border-b-2 border-l-2 border-teal-300/80 absolute bottom-3 left-3" />
                      <div className="w-6 h-6 border-b-2 border-r-2 border-teal-300/80 absolute bottom-3 right-3" />
                      <div className="w-2 h-2 rounded-full bg-teal-400/60" />
                    </div>
                  )}

                  {screeningType === 'eye' && (
                    <div className="w-72 h-44 rounded-[40px] border-2 border-dashed border-teal-400/80 shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-teal-300/60 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-teal-400/70" />
                      </div>
                    </div>
                  )}

                  {screeningType === 'dental' && (
                    <div className="w-72 h-48 rounded-3xl border-2 border-dashed border-teal-400/80 shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center justify-center">
                      <div className="w-48 h-20 rounded-2xl border border-teal-300/50" />
                    </div>
                  )}

                  {/* Positioning Guidance Pill */}
                  <div className="absolute bottom-4 px-3.5 py-1.5 rounded-full bg-slate-950/70 text-slate-200 text-[11px] font-medium backdrop-blur-md border border-slate-700/60 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Hold steady 10–15 cm away under diffuse light</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hidden native camera file input for fallback */}
        <input
          ref={nativeFileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleNativeFileChange}
          className="hidden"
        />

        {/* Controls Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-white">
          {capturedImage ? (
            /* Review Action Buttons */
            <div className="w-full flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleRetake}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retake Photo
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-900/40 transition-all hover:scale-[1.02]"
              >
                <Check className="w-4 h-4" /> Use This Photo
              </button>
            </div>
          ) : !cameraError ? (
            /* Active Live Capture Controls */
            <div className="w-full flex items-center justify-between">
              {/* Left: Device Camera / Upload fallback */}
              <button
                type="button"
                onClick={() => nativeFileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
                title="Switch to file picker or native phone camera"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Use File / Gallery</span>
              </button>

              {/* Center: Main Shutter Button */}
              <button
                type="button"
                onClick={takeSnapshot}
                disabled={isInitializing}
                className="relative group p-1 rounded-full border-4 border-white/30 hover:border-teal-400 focus:outline-none transition-all active:scale-95 disabled:opacity-50"
                title="Take Photo"
              >
                <div className="w-14 h-14 rounded-full bg-white group-hover:bg-teal-400 transition-colors flex items-center justify-center text-slate-950">
                  <div className="w-12 h-12 rounded-full border-2 border-slate-950/20" />
                </div>
              </button>

              {/* Right: Camera Flip Button */}
              <button
                type="button"
                onClick={toggleFacingMode}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
                title="Flip between front and rear cameras"
              >
                <FlipHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {facingMode === 'environment' ? 'Rear Cam' : 'Front Cam'}
                </span>
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
