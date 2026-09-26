import React from 'react';
import {
  AlertOctagon,
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  Eye,
  Activity,
  AlertTriangle,
  ArrowRight,
  LifeBuoy
} from 'lucide-react';

interface EmergencyInfoViewProps {
  onNavigateToHospital: () => void;
}

export const EmergencyInfoView: React.FC<EmergencyInfoViewProps> = ({
  onNavigateToHospital
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Primary Emergency Banner Header */}
      <div className="bg-rose-600 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg border border-rose-700">
        <div className="flex items-center gap-2.5">
          <AlertOctagon className="w-8 h-8 text-white shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Emergency & Urgent Medical Safety Information
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 font-medium">
              Immediate clinical triage guidelines for acute, life-threatening symptoms.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-rose-50 leading-relaxed max-w-3xl pt-2">
          If you or someone around you is experiencing a medical emergency, <strong className="underline font-bold text-white">DO NOT USE THIS SCREENING TOOL</strong>. Call your local emergency telephone number immediately or proceed directly to the nearest hospital Emergency Department.
        </p>

        {/* Global Hotline Quick Buttons */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          <a
            href="tel:911"
            className="px-5 py-3 bg-white text-rose-700 hover:bg-rose-50 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span>Call 911 (USA / Canada)</span>
          </a>

          <a
            href="tel:112"
            className="px-5 py-3 bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm rounded-xl border border-rose-500 shadow-md transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>Call 112 (European Union & Global)</span>
          </a>

          <a
            href="tel:988"
            className="px-5 py-3 bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm rounded-xl border border-rose-500 shadow-md transition-all flex items-center gap-2"
          >
            <LifeBuoy className="w-4 h-4 text-white" />
            <span>988 Suicide & Crisis Lifeline</span>
          </a>
        </div>
      </div>

      {/* Red Flags Guide (Section 21) */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 uppercase tracking-wider">
            <span>Critical Symptoms</span>
            <span aria-hidden="true">·</span>
            <span>Do Not Wait</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Emergency Red Flags Requiring Immediate Emergency Care
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            The following acute symptom constellations must never be evaluated through online software or delayed:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Cardiovascular */}
          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>Cardiovascular & Respiratory Emergencies</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed">
              <li>Sudden crushing chest pressure, tightness, squeezing, or pain radiating to jaw, neck, back, or left arm</li>
              <li>Severe shortness of breath, inability to speak full sentences, audible gasping or stridor</li>
              <li>Sudden severe cyanosis (bluish coloration around lips or fingernails)</li>
            </ul>
          </div>

          {/* Neurological / FAST */}
          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <Activity className="w-4 h-4 text-rose-600" />
              <span>Neurological & Stroke Warning Signs (F.A.S.T.)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed">
              <li><strong>Face:</strong> Sudden facial droop or numbness on one side of face</li>
              <li><strong>Arm:</strong> Sudden weakness, drift, or numbness in one arm or leg</li>
              <li><strong>Speech:</strong> Sudden slurred speech, inability to articulate words, or severe confusion</li>
              <li><strong>Time:</strong> Call emergency services immediately — time is brain tissue.</li>
            </ul>
          </div>

          {/* Ophthalmic */}
          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <Eye className="w-4 h-4 text-rose-600" />
              <span>Acute Ophthalmic Emergencies</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed">
              <li>Sudden partial or complete loss of vision in one or both eyes</li>
              <li>Severe penetrating ocular trauma, chemical splashes, or projectile injury</li>
              <li>Severe deep ocular pain accompanied by nausea, colored halos around lights, or mid-dilated fixed pupil (acute angle-closure glaucoma)</li>
            </ul>
          </div>

          {/* Maxillofacial & Severe Infection */}
          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Severe Systemic & Dental Space Infections</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed">
              <li>Rapidly spreading facial, submandibular, or floor-of-mouth swelling that impairs breathing or swallowing (Ludwig’s Angina)</li>
              <li>High spiking fever accompanied by a stiff neck and extreme sensitivity to bright light (meningitis)</li>
              <li>Severe sudden allergic anaphylaxis with swelling of tongue, lips, or throat constriction</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hospital Referral Box */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">
            Need to Locate the Closest Emergency Department?
          </h3>
          <p className="text-xs text-slate-600 max-w-xl">
            Access our hospital directory filtered specifically for acute emergency departments and trauma centers with 24-hour service.
          </p>
        </div>
        <button
          onClick={onNavigateToHospital}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Open Hospital Finder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
