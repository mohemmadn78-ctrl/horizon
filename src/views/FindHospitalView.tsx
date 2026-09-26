import React, { useState } from 'react';
import { Search, MapPin, Phone, Building2, ShieldAlert, Navigation, Clock, CheckCircle2 } from 'lucide-react';
import { VERIFIED_HOSPITALS } from '../data/medicalDatabase';

export const FindHospitalView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const facilityTypes = ['All', 'Hospital', 'Eye Center', 'Dental Clinic', 'Dermatology Center', 'Diagnostic Center'];

  const filteredHospitals = VERIFIED_HOSPITALS.filter((hosp) => {
    const matchesType = typeFilter === 'All' || hosp.type === typeFilter;
    const matchesSearch =
      hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <span>Facility & Diagnostic Directory</span>
          <span aria-hidden="true">·</span>
          <span>Verified Clinical Sites</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Hospitals, Specialty Clinics & Diagnostic Imaging Centers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Locate regional medical centers equipped with advanced in-person diagnostics, including ophthalmic OCT, dermatoscopy biopsy suites, intraoral CBCT, and 24/7 emergency departments.
        </p>
      </div>

      {/* Emergency Department Notice */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-xs text-rose-950">
        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-rose-900 uppercase tracking-wide">
            Emergency Care Notice:
          </p>
          <p className="leading-relaxed mt-0.5 text-rose-800">
            For sudden severe vision loss, chemical ocular burns, severe spreading facial swelling, or crushing chest pain, go directly to a hospital emergency department marked with <span className="font-bold text-rose-900">24/7 Emergency Services</span> or dial 911/112 immediately.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by facility name, service, or city..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-teal-600 text-slate-800"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-teal-600"
            >
              {facilityTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Facility Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHospitals.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
            No clinical facilities found matching your criteria.
          </div>
        ) : (
          filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-teal-500/60 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-semibold text-slate-500">
                      {hosp.type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {hosp.name}
                    </h3>
                  </div>
                  {hosp.emergency_services ? (
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded font-semibold text-[11px] shrink-0">
                      24/7 Emergency
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded font-medium text-[11px] shrink-0">
                      Outpatient / Specialty
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{hosp.address}, {hosp.city}, {hosp.state} {hosp.postal_code}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{hosp.phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{hosp.hours}</span>
                  </p>
                </div>

                {/* Specialties and Imaging Labs */}
                <div className="pt-2 text-xs space-y-2">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-800 block">
                      Diagnostic Imaging & Laboratory Services:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {hosp.diagnostic_imaging.map((img, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {img}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-800 block">
                      Clinical Specialty Departments:
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {hosp.specialties.join(' · ')}
                    </p>
                  </div>

                  {hosp.directions_note && (
                    <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100">
                      Directions: {hosp.directions_note}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={`tel:${hosp.phone.replace(/[^0-9]/g, '')}`}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Facility</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${hosp.name}, ${hosp.address}, ${hosp.city}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-600" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
