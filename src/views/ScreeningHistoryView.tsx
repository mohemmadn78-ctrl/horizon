import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Trash2,
  Download,
  AlertTriangle,
  ArrowRight,
  Camera,
  Eye,
  Smile,
  Mic,
  FileText,
  Clock,
  Layers,
  CheckCircle2
} from 'lucide-react';
import {
  getScreeningHistory,
  deleteScreeningHistoryItem,
  purgeAllUserData
} from '../services/apiService';
import { ScreeningResult } from '../types';

interface ScreeningHistoryViewProps {
  onSelectResult: (result: ScreeningResult) => void;
  onNewScreening: () => void;
}

export const ScreeningHistoryView: React.FC<ScreeningHistoryViewProps> = ({
  onSelectResult,
  onNewScreening
}) => {
  const [history, setHistory] = useState<ScreeningResult[]>([]);
  const [filterType, setFilterType] = useState('all');

  // Evolution comparison selection
  const [compareLeft, setCompareLeft] = useState<ScreeningResult | null>(null);
  const [compareRight, setCompareRight] = useState<ScreeningResult | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const records = getScreeningHistory();
    setHistory(records);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this screening record?')) {
      deleteScreeningHistoryItem(id);
      loadHistory();
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `ClinicaScreen_History_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to permanently delete ALL screening history records from this browser?')) {
      purgeAllUserData();
      loadHistory();
    }
  };

  const filteredHistory = history.filter((item) => {
    if (filterType === 'all') return true;
    return item.screening_type === filterType;
  });

  const skinRecords = history.filter((h) => h.screening_type === 'skin' && h.image_preview);

  const startComparison = (item: ScreeningResult, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareLeft(item);
    // Find an older or another skin record
    const others = skinRecords.filter((s) => s.id !== item.id);
    if (others.length > 0) {
      setCompareRight(others[0]);
    } else {
      setCompareRight(item);
    }
    setShowCompareModal(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skin':
        return <Camera className="w-4 h-4 text-teal-600" />;
      case 'eye':
        return <Eye className="w-4 h-4 text-teal-600" />;
      case 'dental':
        return <Smile className="w-4 h-4 text-teal-600" />;
      case 'voice':
        return <Mic className="w-4 h-4 text-teal-600" />;
      default:
        return <FileText className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <span>Patient Records Log</span>
            <span aria-hidden="true">·</span>
            <span>Private Browser Local Storage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Screening History & Evolution Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Review past screening outcomes and compare chronological photographic baselines to monitor visual progression over time.
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Log (JSON)</span>
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
          <button
            onClick={onNewScreening}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
          >
            New Screening
          </button>
        </div>
      </div>

      {/* Mandatory Evolution Disclaimer (Section 17) */}
      <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 font-semibold">Evolution Tracking Policy:</strong> For skin lesions, comparison across dates assists in observing visual changes in symmetry, border, or diameter. <strong>Do NOT interpret detected change as a confirmed medical diagnosis.</strong> Always present sequential images directly to a dermatologist.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {['all', 'skin', 'eye', 'dental', 'voice', 'symptoms'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors capitalize ${
              filterType === t
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {t === 'all' ? 'All Screenings' : t}
          </button>
        ))}
      </div>

      {/* Records List */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
          <Clock className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Screening Records Saved</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You have not completed any health screenings yet, or past records were purged. Launch a screening module to generate a report.
          </p>
          <button
            onClick={onNewScreening}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors mt-2"
          >
            Launch First Screening
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectResult(item)}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-teal-500/60 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail or icon */}
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                  {item.image_preview ? (
                    <img
                      src={item.image_preview}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getTypeIcon(item.screening_type)
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold uppercase text-teal-800 font-mono">
                      {item.screening_type}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <span aria-hidden="true">·</span>
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {item.finding}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.recommended_next_step}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 sm:self-center">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Confidence</span>
                  <span className="text-xs font-mono font-bold text-teal-700">
                    {(item.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                {/* Lesion Evolution Button if skin */}
                {item.screening_type === 'skin' && item.image_preview && skinRecords.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => startComparison(item, e)}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-teal-50 text-teal-800 hover:bg-teal-100 transition-colors flex items-center gap-1"
                    title="Compare lesion baseline over time"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Compare Evolution</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => handleDeleteItem(item.id, e)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                  aria-label="Delete result"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Side-by-Side Evolution Comparison Modal */}
      {showCompareModal && compareLeft && compareRight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Lesion Evolution Comparison: Baseline vs Follow-up
                </h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-slate-500 hover:text-slate-800 text-xs font-semibold px-2 py-1"
              >
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 rounded-lg">
                <strong>Clinical Principle:</strong> Visual difference indicates structural change over time, which is the "E" in the ABCDE melanoma detection guideline. It does not establish a diagnosis. Share both photographs with your dermatologist.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Photo */}
                <div className="space-y-3 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Baseline Capture</span>
                    <span className="text-slate-500 font-mono">
                      {new Date(compareLeft.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="h-64 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={compareLeft.image_preview}
                      alt="Baseline lesion"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-800">{compareLeft.finding}</p>
                    <p className="text-slate-500">Confidence: {(compareLeft.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>

                {/* Right Photo */}
                <div className="space-y-3 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Comparison Follow-up</span>
                    <span className="text-slate-500 font-mono">
                      {new Date(compareRight.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="h-64 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={compareRight.image_preview}
                      alt="Followup lesion"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-800">{compareRight.finding}</p>
                    <p className="text-slate-500">Confidence: {(compareRight.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
