import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyBanner } from './components/EmergencyBanner';
import { ConsentModal } from './components/ConsentModal';
import { GroqAssistantModal } from './components/GroqAssistantModal';

import { HomeView } from './views/HomeView';
import { ScreeningHubView } from './views/ScreeningHubView';
import { SkinScreeningView } from './views/SkinScreeningView';
import { EyeScreeningView } from './views/EyeScreeningView';
import { DentalScreeningView } from './views/DentalScreeningView';
import { VoiceScreeningView } from './views/VoiceScreeningView';
import { ConcernView } from './views/ConcernView';
import { ResultsView } from './views/ResultsView';
import { DiseaseDatabaseView } from './views/DiseaseDatabaseView';
import { FindDoctorView } from './views/FindDoctorView';
import { FindHospitalView } from './views/FindHospitalView';
import { ScreeningHistoryView } from './views/ScreeningHistoryView';
import { PrivacyConsentView } from './views/PrivacyConsentView';
import { AboutAIView } from './views/AboutAIView';
import { EmergencyInfoView } from './views/EmergencyInfoView';

import { getStoredConsent, saveStoredConsent, purgeAllUserData } from './services/apiService';
import { ScreeningResult, UserConsentState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [consent, setConsent] = useState<UserConsentState>(getStoredConsent());
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);

  // Groq AI Assistant state
  const [isGroqModalOpen, setIsGroqModalOpen] = useState(false);
  const [groqInitialQuestion, setGroqInitialQuestion] = useState<string | undefined>(undefined);

  // Active screening result state
  const [activeResult, setActiveResult] = useState<ScreeningResult | null>(null);

  // Pre-filtered doctor specialty
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const handleSaveConsent = (newConsent: UserConsentState) => {
    setConsent(newConsent);
    saveStoredConsent(newConsent);
  };

  const handlePurgeData = () => {
    purgeAllUserData();
    setConsent(getStoredConsent());
  };

  const handleScreeningComplete = (result: ScreeningResult) => {
    setActiveResult(result);
    setCurrentView('results');
  };

  const handleNavigateToDoctor = (specialty?: string) => {
    setSelectedSpecialty(specialty);
    setCurrentView('doctors');
  };

  const handleNavigateToHospital = () => {
    setCurrentView('hospitals');
  };

  const handleNavigateToCondition = (conditionId: string) => {
    setCurrentView('diseases');
  };

  const handleOpenGroqWithQuestion = (question?: string) => {
    setGroqInitialQuestion(question);
    setIsGroqModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-teal-600 selection:text-white">
      {/* Universal Top Emergency Caution Banner */}
      <EmergencyBanner
        onNavigateToEmergency={() => handleNavigate('emergency')}
        isUrgentIncident={activeResult?.urgency_level === 'emergency'}
        message={
          activeResult?.urgency_level === 'emergency'
            ? 'CRITICAL RED FLAGS INDICATED: Please seek immediate medical attention or call emergency services.'
            : undefined
        }
      />

      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        consentAgreed={consent.data_collection_agreed}
        onOpenConsent={() => setIsConsentModalOpen(true)}
        onOpenGroqAssistant={() => handleOpenGroqWithQuestion()}
      />

      {/* Main Page Stage */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {currentView === 'screening_hub' && (
          <ScreeningHubView
            onNavigate={handleNavigate}
            consentAgreed={consent.data_collection_agreed}
            onOpenConsent={() => setIsConsentModalOpen(true)}
          />
        )}

        {currentView === 'skin_screening' && (
          <SkinScreeningView
            onComplete={handleScreeningComplete}
            consentAgreed={consent.data_collection_agreed}
            onOpenConsent={() => setIsConsentModalOpen(true)}
          />
        )}

        {currentView === 'eye_screening' && (
          <EyeScreeningView
            onComplete={handleScreeningComplete}
            consentAgreed={consent.data_collection_agreed}
            onOpenConsent={() => setIsConsentModalOpen(true)}
          />
        )}

        {currentView === 'dental_screening' && (
          <DentalScreeningView
            onComplete={handleScreeningComplete}
            consentAgreed={consent.data_collection_agreed}
            onOpenConsent={() => setIsConsentModalOpen(true)}
          />
        )}

        {currentView === 'voice_screening' && (
          <VoiceScreeningView
            onComplete={handleScreeningComplete}
            consentAgreed={consent.data_collection_agreed}
            onOpenConsent={() => setIsConsentModalOpen(true)}
          />
        )}

        {currentView === 'concern' && (
          <ConcernView
            onComplete={handleScreeningComplete}
            consentAgreed={consent.data_collection_agreed}
            onOpenConsent={() => setIsConsentModalOpen(true)}
            onNavigateToEmergency={() => handleNavigate('emergency')}
          />
        )}

        {currentView === 'results' && activeResult && (
          <ResultsView
            result={activeResult}
            onNavigateToDoctor={handleNavigateToDoctor}
            onNavigateToHospital={handleNavigateToHospital}
            onNavigateToCondition={handleNavigateToCondition}
            onNewScreening={() => handleNavigate('screening_hub')}
            onAskGroq={handleOpenGroqWithQuestion}
          />
        )}

        {currentView === 'results' && !activeResult && (
          <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
            <h2 className="text-lg font-bold text-slate-800">No Active Screening Result</h2>
            <p className="text-xs text-slate-500">
              Please choose a screening protocol from the hub to generate an evaluation report.
            </p>
            <button
              onClick={() => handleNavigate('screening_hub')}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
            >
              Go to Screenings
            </button>
          </div>
        )}

        {currentView === 'diseases' && (
          <DiseaseDatabaseView
            onNavigateToDoctor={handleNavigateToDoctor}
            onSelectCondition={handleNavigateToCondition}
          />
        )}

        {currentView === 'doctors' && (
          <FindDoctorView
            initialSpecialty={selectedSpecialty}
            onNavigateToHospital={handleNavigateToHospital}
          />
        )}

        {currentView === 'hospitals' && (
          <FindHospitalView />
        )}

        {currentView === 'history' && (
          <ScreeningHistoryView
            onSelectResult={(res) => {
              setActiveResult(res);
              setCurrentView('results');
            }}
            onNewScreening={() => handleNavigate('screening_hub')}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyConsentView
            consent={consent}
            onSaveConsent={handleSaveConsent}
            onPurgeData={handlePurgeData}
          />
        )}

        {currentView === 'about_ai' && (
          <AboutAIView />
        )}

        {currentView === 'emergency' && (
          <EmergencyInfoView
            onNavigateToHospital={handleNavigateToHospital}
          />
        )}
      </main>

      {/* Floating Groq AI Assistant Button */}
      <div className="fixed bottom-5 right-5 z-40 print:hidden">
        <button
          type="button"
          onClick={() => handleOpenGroqWithQuestion()}
          className="group flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-teal-900 text-white rounded-full shadow-2xl border border-teal-500/40 hover:border-teal-400 transition-all hover:scale-105 active:scale-95"
          title="Open Groq Clinical AI Assistant (openai/gpt-oss-120b)"
        >
          <div className="w-6 h-6 rounded-full bg-teal-500/30 text-teal-300 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>Groq AI Consult</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-teal-500/20 text-teal-300 rounded font-mono">120b</span>
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">openai/gpt-oss-120b</div>
          </div>
        </button>
      </div>

      {/* Structured Clinical Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Patient Privacy & Consent Modal */}
      <ConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        consent={consent}
        onSaveConsent={handleSaveConsent}
        onPurgeData={handlePurgeData}
      />

      {/* Groq Clinical AI Assistant Modal */}
      <GroqAssistantModal
        isOpen={isGroqModalOpen}
        onClose={() => setIsGroqModalOpen(false)}
        activeResult={activeResult}
        initialQuestion={groqInitialQuestion}
      />
    </div>
  );
}
