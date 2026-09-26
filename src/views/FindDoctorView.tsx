import React, { useState } from 'react';
import { Search, MapPin, Phone, CheckCircle2, UserCheck, Video, Calendar, ShieldCheck, Filter } from 'lucide-react';
import { VERIFIED_DOCTORS } from '../data/medicalDatabase';
import { Doctor } from '../types';

interface FindDoctorViewProps {
  initialSpecialty?: string;
  onNavigateToHospital: () => void;
}

export const FindDoctorView: React.FC<FindDoctorViewProps> = ({
  initialSpecialty,
  onNavigateToHospital
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState(initialSpecialty || 'All');
  const [telehealthOnly, setTelehealthOnly] = useState(false);

  const specialties = [
    'All',
    'Dermatologist',
    'Ophthalmologist',
    'Dentist',
    'Periodontist',
    'Otolaryngologist',
    'General Physician'
  ];

  const filteredDoctors = VERIFIED_DOCTORS.filter((doc) => {
    const matchesSpecialty =
      specialtyFilter === 'All' ||
      doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase()) ||
      (doc.subspecialty && doc.subspecialty.toLowerCase().includes(specialtyFilter.toLowerCase()));

    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital_clinic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTelehealth = !telehealthOnly || doc.telehealth_available;

    return matchesSpecialty && matchesSearch && matchesTelehealth;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Healthcare Professional Directory</span>
          <span aria-hidden="true">·</span>
          <span>Verified Medical Providers</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Find a Verified Medical Doctor or Specialist
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Connect with board-certified physicians, dermatologists, ophthalmologists, dentists, and otolaryngologists for comprehensive in-person evaluations and definitive diagnosis.
        </p>
      </div>

      {/* Live Availability Notice (Section 15 Rule) */}
      <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 font-semibold">Integrity Notice:</strong> In accordance with clinical standards, PathoSense does not fabricate real-time appointment availability slots. Please call the clinic directly to confirm same-day openings or book verified consultations.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by physician name, clinic, or city..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800"
            />
          </div>

          {/* Specialty Selector */}
          <div className="md:col-span-4">
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-teal-600"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Specialties' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Telehealth toggle */}
          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={telehealthOnly}
                onChange={(e) => setTelehealthOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Telehealth Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
            No doctors found matching the selected filters.
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-teal-500/60 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {doc.name}, <span className="text-xs font-semibold text-slate-600">{doc.title}</span>
                    </h3>
                    <p className="text-xs font-semibold text-teal-800 mt-0.5">
                      {doc.specialty}
                    </p>
                    {doc.subspecialty && (
                      <p className="text-[11px] text-slate-500">{doc.subspecialty}</p>
                    )}
                  </div>
                  {doc.verified_credentials && (
                    <div className="flex items-center gap-1 text-[11px] text-teal-700 font-medium bg-teal-50 px-2 py-0.5 rounded">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="font-medium text-slate-800">{doc.hospital_clinic}</p>
                  <p className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.address}, {doc.city}, {doc.state}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.phone}</span>
                  </p>
                </div>

                {/* Degrees & Badges */}
                <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                  <p>• {doc.degrees.join(' · ')}</p>
                  <p>• {doc.experience_years} years clinical practice</p>
                  <p>• Languages: {doc.languages.join(', ')}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {doc.telehealth_available ? (
                  <span className="text-[11px] text-teal-700 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    <span>Telehealth Active</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">In-person only</span>
                )}

                <a
                  href={`tel:${doc.phone.replace(/[^0-9]/g, '')}`}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Office</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
