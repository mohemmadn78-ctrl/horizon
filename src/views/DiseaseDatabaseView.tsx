import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink, ShieldCheck, AlertTriangle, Stethoscope, Filter } from 'lucide-react';
import { MEDICAL_DISEASES } from '../data/medicalDatabase';
import { DiseaseInfo } from '../types';

interface DiseaseDatabaseViewProps {
  onSelectCondition?: (conditionId: string) => void;
  onNavigateToDoctor: (specialty?: string) => void;
}

export const DiseaseDatabaseView: React.FC<DiseaseDatabaseViewProps> = ({
  onSelectCondition,
  onNavigateToDoctor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo | null>(MEDICAL_DISEASES[0]);

  const categories = ['All', 'Dermatology', 'Ophthalmology', 'Oral & Dental', 'Voice & Laryngeal'];

  const filteredDiseases = MEDICAL_DISEASES.filter((d) => {
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.common_symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Medical Encyclopedia</span>
          <span aria-hidden="true">·</span>
          <span>Verified Clinical References</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Disease Information & Clinical Reference Database
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Peer-reviewed medical monographs compiled from the American Academy of Dermatology (AAD), American Academy of Ophthalmology (AAO), American Dental Association (ADA), and WHO guidelines.
        </p>
      </div>

      {/* Mandatory Non-Prescription Treatment Notice (Section 14) */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900 uppercase tracking-wide">
            Medication & Treatment Information Policy:
          </p>
          <p className="leading-relaxed">
            PathoSense explains medicines and treatment categories used for a condition for educational purposes only. <strong>We do not prescribe medications.</strong> These treatments may be used for this condition; a qualified healthcare professional must determine whether they are appropriate for your individual clinical status.
          </p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conditions, symptoms, or tests..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Disease List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List column */}
        <div className="lg:col-span-4 space-y-2 max-h-[750px] overflow-y-auto pr-1">
          {filteredDiseases.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
              No matching clinical conditions found.
            </div>
          ) : (
            filteredDiseases.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDisease(d)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                  selectedDisease?.id === d.id
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                      {d.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Reviewed: {d.last_reviewed_date}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    {d.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {d.overview}
                  </p>
                </div>
                <div className="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                  <span>View Full Clinical Monograph</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail Column */}
        <div className="lg:col-span-8">
          {selectedDisease ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono uppercase font-semibold text-teal-800">
                    {selectedDisease.category} MONOGRAPH
                  </span>
                  <span>Last Reviewed: {selectedDisease.last_reviewed_date}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedDisease.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {selectedDisease.overview}
                </p>
              </div>

              {/* Grid 1: Causes & Risk Factors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    Common Causes
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {selectedDisease.common_causes.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    Risk Factors
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {selectedDisease.risk_factors.map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Grid 2: Symptoms & Visual Signs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    Common Symptoms
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {selectedDisease.common_symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    Typical Visual / Audio Signs
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {selectedDisease.typical_visual_audio_signs.map((sign, i) => (
                      <li key={i}>{sign}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clinical Diagnostic Tests */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                  Diagnostic Tests Normally Used by Medical Professionals
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  {selectedDisease.clinical_diagnostic_tests.map((test, i) => (
                    <li key={i}>{test}</li>
                  ))}
                </ul>
              </div>

              {/* Treatments & Prevention */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    General Treatment Categories (Educational)
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {selectedDisease.general_treatments.map((tr, i) => (
                      <li key={i}>{tr}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                    Prevention & Proactive Care
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {selectedDisease.prevention.map((prev, i) => (
                      <li key={i}>{prev}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Warning signs */}
              <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1.5 text-xs text-rose-950">
                <div className="font-bold text-[11px] uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Clinical Warning Signs (Seek In-Person Care):</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-rose-900">
                  {selectedDisease.warning_signs.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              {/* Appropriate Specialist & References */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">
                    Appropriate Medical Specialist:
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedDisease.appropriate_specialist}
                  </span>
                </div>
                <button
                  onClick={() => onNavigateToDoctor(selectedDisease.appropriate_specialist)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Find a {selectedDisease.appropriate_specialist.split(' ')[0]}</span>
                </button>
              </div>

              {/* References list */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <span className="font-semibold text-slate-700">Trusted Clinical References:</span>
                {selectedDisease.references.map((ref, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-slate-600">
                    <span>• {ref.title} — {ref.organization} ({ref.year})</span>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 hover:underline inline-flex items-center gap-0.5 ml-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
              Select a condition from the left column to view the full clinical monograph.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
