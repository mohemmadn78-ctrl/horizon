import React from 'react';
import { AlertOctagon, PhoneCall, ArrowRight } from 'lucide-react';

interface EmergencyBannerProps {
  onNavigateToEmergency?: () => void;
  message?: string;
  isUrgentIncident?: boolean;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  onNavigateToEmergency,
  message,
  isUrgentIncident = false
}) => {
  return (
    <div
      role="alert"
      className={`border-b ${
        isUrgentIncident
          ? 'bg-rose-600 text-white border-rose-700 py-3.5 px-4'
          : 'bg-rose-50 border-rose-200 text-rose-900 py-2.5 px-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <AlertOctagon className={`w-4 h-4 shrink-0 ${isUrgentIncident ? 'text-white' : 'text-rose-600'}`} />
          <p className="leading-snug">
            <strong className="font-semibold">
              {isUrgentIncident ? 'EMERGENCY PROTOCOL TRIGGERED: ' : 'URGENT MEDICAL SAFETY: '}
            </strong>
            {message ||
              'If experiencing sudden chest pain, loss of vision, severe shortness of breath, anaphylaxis, or facial drooping, call emergency services immediately.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:911"
            className={`font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              isUrgentIncident
                ? 'bg-white text-rose-700 hover:bg-rose-50 shadow-sm'
                : 'bg-rose-600 text-white hover:bg-rose-700'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 911 / 112</span>
          </a>

          {onNavigateToEmergency && (
            <button
              onClick={onNavigateToEmergency}
              className={`underline underline-offset-2 inline-flex items-center gap-1 hover:opacity-80 transition-opacity ${
                isUrgentIncident ? 'text-white' : 'text-rose-800'
              }`}
            >
              <span>Emergency Guidelines</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
