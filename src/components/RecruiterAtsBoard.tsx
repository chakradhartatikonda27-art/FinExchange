'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStage } from '../types';
import { ShieldCheck, Plus } from 'lucide-react';

export const RecruiterAtsBoard: React.FC = () => {
  const { applications, updateApplicationStage } = useApp();

  const stages: { stage: ApplicationStage; title: string; color: string }[] = [
    { stage: 'APPLIED', title: 'Applied', color: 'border-slate-200 bg-slate-50/50' },
    { stage: 'SHORTLISTED', title: 'Shortlisted', color: 'border-emerald-200 bg-emerald-50/30' },
    { stage: 'INTERVIEW', title: 'Interview', color: 'border-blue-200 bg-blue-50/30' },
    { stage: 'SELECTED', title: 'Selected / Hired', color: 'border-emerald-300 bg-emerald-50/60' },
    { stage: 'REJECTED', title: 'Rejected', color: 'border-red-200 bg-red-50/20' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Recruiter ATS Candidate Pipeline</h3>
          <p className="text-xs text-slate-500">Manage candidate hiring workflow stages</p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {applications.length} Total Applicants
        </span>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {stages.map(({ stage, title, color }) => {
          const stageApps = applications.filter(a => a.stage === stage);

          return (
            <div key={stage} className={`p-3 rounded-2xl border ${color} space-y-3 min-h-[220px] flex flex-col justify-between`}>
              <div>
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 mb-2">
                  <span className="text-xs font-extrabold text-slate-900">{title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    stageApps.length > 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-200 text-slate-600 border-slate-300'
                  }`}>
                    {stageApps.length}
                  </span>
                </div>

                {/* Candidate Cards in Stage */}
                <div className="space-y-2">
                  {stageApps.map(app => (
                    <div key={app.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 line-clamp-1">{app.applicantName}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                          {app.qualification}
                        </span>
                      </div>

                      <p className="text-slate-600 font-medium text-[11px]">{app.jobTitle}</p>

                      {app.coverNote && (
                        <p className="text-[10px] text-slate-500 italic line-clamp-2">"{app.coverNote}"</p>
                      )}

                      {/* Move Stage Quick Actions */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                        {stage === 'APPLIED' && (
                          <button
                            onClick={() => updateApplicationStage(app.id, 'SHORTLISTED')}
                            className="w-full py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors"
                          >
                            Shortlist Candidate
                          </button>
                        )}
                        {stage === 'SHORTLISTED' && (
                          <button
                            onClick={() => updateApplicationStage(app.id, 'INTERVIEW')}
                            className="w-full py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] transition-colors"
                          >
                            Schedule Interview
                          </button>
                        )}
                        {stage === 'INTERVIEW' && (
                          <button
                            onClick={() => updateApplicationStage(app.id, 'SELECTED')}
                            className="w-full py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] transition-colors"
                          >
                            Mark Selected
                          </button>
                        )}
                        {stage !== 'REJECTED' && (
                          <button
                            onClick={() => updateApplicationStage(app.id, 'REJECTED')}
                            className="w-full py-0.5 rounded text-red-600 hover:bg-red-50 font-semibold text-[10px]"
                          >
                            Reject Candidate
                          </button>
                        )}
                      </div>

                    </div>
                  ))}

                  {/* Clean Non-confusing Dropzone placeholder when empty */}
                  {stageApps.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center space-y-1 my-2">
                      <Plus className="w-4 h-4 text-slate-300 mx-auto" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Empty Stage</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
