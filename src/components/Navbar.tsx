import React, { useState } from 'react';
import { ShieldAlert, Menu, X, Activity, UserCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  consentAgreed: boolean;
  onOpenConsent: () => void;
  onOpenGroqAssistant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  consentAgreed,
  onOpenConsent,
  onOpenGroqAssistant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'screening_hub', label: 'Screenings' },
    { id: 'concern', label: 'Symptoms' },
    { id: 'diseases', label: 'Conditions' },
    { id: 'doctors', label: 'Find Doctors' },
    { id: 'hospitals', label: 'Clinics' },
    { id: 'history', label: 'History' },
    { id: 'about_ai', label: 'About AI' }
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-slate-900 hover:text-teal-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-4 h-4" />
            </div>
            <span>ClinicaScreen AI</span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap py-1 ${
                  currentView === item.id
                    ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('history')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentView === 'history'
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : 'hover:text-slate-900'
              }`}
            >
              History
            </button>
            <button
              onClick={() => handleNavClick('about_ai')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentView === 'about_ai'
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : 'hover:text-slate-900'
              }`}
            >
              About AI
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenGroqAssistant?.()}
              className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              title="Consult with Groq Clinical AI Assistant (openai/gpt-oss-120b)"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>Groq AI Consult</span>
            </button>

            <button
              onClick={() => handleNavClick('emergency')}
              className="px-3 py-1.5 text-xs font-medium text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap"
              title="Emergency & Safety Guidelines"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Emergency Info</span>
            </button>

            <button
              onClick={() => handleNavClick('screening_hub')}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              Start Screening
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('emergency')}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
              aria-label="Emergency Info"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg">
          <div className="grid grid-cols-1 gap-1 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'home' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('screening_hub')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'screening_hub' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              All Screenings (Skin, Eye, Dental, Voice)
            </button>
            <button
              onClick={() => handleNavClick('skin_screening')}
              className="w-full text-left py-2 px-6 text-xs text-slate-600 hover:text-teal-700"
            >
              → Skin Screening (ABCDE Analysis)
            </button>
            <button
              onClick={() => handleNavClick('eye_screening')}
              className="w-full text-left py-2 px-6 text-xs text-slate-600 hover:text-teal-700"
            >
              → Eye Screening (Anterior Segment)
            </button>
            <button
              onClick={() => handleNavClick('dental_screening')}
              className="w-full text-left py-2 px-6 text-xs text-slate-600 hover:text-teal-700"
            >
              → Teeth & Oral Screening
            </button>
            <button
              onClick={() => handleNavClick('voice_screening')}
              className="w-full text-left py-2 px-6 text-xs text-slate-600 hover:text-teal-700"
            >
              → Standardized Voice Screening
            </button>
            <button
              onClick={() => handleNavClick('concern')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'concern' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              Describe Your Concern (Symptom Triage)
            </button>
            <button
              onClick={() => handleNavClick('diseases')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'diseases' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              Condition Database & Medical References
            </button>
            <button
              onClick={() => handleNavClick('doctors')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'doctors' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              Find a Doctor
            </button>
            <button
              onClick={() => handleNavClick('hospitals')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'hospitals' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              Find a Hospital or Specialty Clinic
            </button>
            <button
              onClick={() => handleNavClick('history')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'history' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              Screening History & Evolution Tracker
            </button>
            <button
              onClick={() => handleNavClick('about_ai')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'about_ai' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              About the AI & Clinical Validation
            </button>
            <button
              onClick={() => handleNavClick('privacy')}
              className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${currentView === 'privacy' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50'}`}
            >
              Privacy, Consent & Data Governance
            </button>
            <button
              onClick={() => handleNavClick('emergency')}
              className="w-full text-left py-2.5 px-3 rounded-md text-rose-700 font-medium hover:bg-rose-50"
            >
              Emergency & Urgent Safety Information
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGroqAssistant?.();
              }}
              className="w-full py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Groq AI Consult (openai/gpt-oss-120b)</span>
            </button>
            <button
              onClick={onOpenConsent}
              className="w-full py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-md flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>{consentAgreed ? 'Consent Verified (Manage)' : 'Review Clinical Consent'}</span>
            </button>
            <button
              onClick={() => handleNavClick('screening_hub')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-teal-600 rounded-md text-center"
            >
              Start New Health Screening
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
