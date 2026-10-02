'use client';

import React from 'react';
import { CompanyListing, JobListing } from '../types';
import { useApp } from '../context/AppContext';
import { matchCompanyWithBuyers, matchJobWithProfessionals } from '../lib/matchingEngine';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  UserCheck, 
  Send, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SmartMatchDrawerProps {
  item: CompanyListing | JobListing | null;
  type: 'COMPANY' | 'JOB';
  isOpen: boolean;
  onClose: () => void;
  onOpenMiniCv?: (profile: any) => void;
}

export const SmartMatchDrawer: React.FC<SmartMatchDrawerProps> = ({
  item,
  type,
  isOpen,
  onClose,
  onOpenMiniCv
}) => {
  const { buyRequests, professionals } = useApp();
  const [actionSuccessId, setActionSuccessId] = React.useState<string | null>(null);

  if (!isOpen || !item) return null;

  const companyMatches = type === 'COMPANY' ? matchCompanyWithBuyers(item as CompanyListing, buyRequests) : [];
  const jobMatches = type === 'JOB' ? matchJobWithProfessionals(item as JobListing, professionals) : [];

  const handleAction = (id: string) => {
    setActionSuccessId(id);
    setTimeout(() => {
      setActionSuccessId(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white text-slate-900 w-full max-w-lg h-full overflow-hidden shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-start border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black">
              <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                AI Two-Way Match Engine
              </span>
              <h2 className="text-base font-extrabold text-white mt-0.5">
                {type === 'COMPANY' ? 'Matching Acquisition Buyers' : 'Matching Qualified Candidates'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Item Bar */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Target Listing</span>
            <span className="font-extrabold text-slate-900 block truncate max-w-xs">
              {type === 'COMPANY' ? (item as CompanyListing).listingTitle : (item as JobListing).title}
            </span>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
            {type === 'COMPANY' ? `${companyMatches.length} Matches` : `${jobMatches.length} Candidates`}
          </span>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {type === 'COMPANY' && (
            <>
              {companyMatches.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No matching buyer acquisition mandates found for this criteria yet.
                </div>
              ) : (
                companyMatches.map(({ buyerRequest, matchScore, matchReasons }) => (
                  <div 
                    key={buyerRequest.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 p-4 shadow-2xs transition-all space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-black text-slate-900 block">{buyerRequest.buyerName}</span>
                        <span className="text-[11px] text-slate-500">Target: {buyerRequest.preferredIndustry} • Budget: {buyerRequest.budgetDisplay}</span>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
                        ⚡ {matchScore}% Match
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-[11px]">
                      <span className="font-bold text-slate-700 block">AI Match Breakdown:</span>
                      {matchReasons.map((reason, i) => (
                        <span key={i} className="text-slate-600 block">{reason}</span>
                      ))}
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => handleAction(buyerRequest.id)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                          actionSuccessId === buyerRequest.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {actionSuccessId === buyerRequest.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>✓ Connected via Platform</span>
                          </>
                        ) : (
                          <>
                            <span>Connect with Buyer</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {type === 'JOB' && (
            <>
              {jobMatches.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No matching candidate profiles found.
                </div>
              ) : (
                jobMatches.map(({ candidate, matchScore, matchReasons }) => (
                  <div 
                    key={candidate.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 p-4 shadow-2xs transition-all space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-xs">
                          {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <span className="text-xs font-black text-slate-900 block">{candidate.name}</span>
                          <span className="text-[11px] text-slate-500">{candidate.title} • {candidate.location}</span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
                        ⚡ {matchScore}% Match
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-[11px]">
                      <span className="font-bold text-slate-700 block">AI Match Breakdown:</span>
                      {matchReasons.map((reason, i) => (
                        <span key={i} className="text-slate-600 block">{reason}</span>
                      ))}
                    </div>

                    <div className="pt-1 flex justify-end space-x-2">
                      {onOpenMiniCv && (
                        <button
                          onClick={() => onOpenMiniCv(candidate)}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50"
                        >
                          View Mini-CV
                        </button>
                      )}
                      <button
                        onClick={() => handleAction(candidate.id)}
                        className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 transition-all ${
                          actionSuccessId === candidate.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {actionSuccessId === candidate.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>✓ Invitation Sent</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Invite Candidate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
