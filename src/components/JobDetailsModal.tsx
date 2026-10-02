'use client';

import React, { useState } from 'react';
import { JobListing } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Briefcase, Clock, ShieldCheck, Bookmark, X, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface JobDetailsModalProps {
  job: JobListing | null;
  onClose: () => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  const { applyForJob, savedJobIds, toggleSaveJob } = useApp();
  const [coverNote, setCoverNote] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  if (!job) return null;

  const isSaved = savedJobIds.includes(job.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    applyForJob(job.id, coverNote);
    setIsApplied(true);
    setTimeout(() => {
      setIsApplied(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-navy-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
              {job.category}
            </span>
            <span className="text-xs text-slate-300 font-semibold">{job.companyName}</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

          {isApplied && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-xl flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs font-bold">Application Submitted Successfully!</div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-navy-900">{job.title}</h2>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 mt-1">
              <span>{job.companyName}</span>
              {job.verificationStatus === 'VERIFIED' && (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location</span>
              <span className="font-bold text-slate-800 flex items-center space-x-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.location}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Experience</span>
              <span className="font-bold text-slate-800 flex items-center space-x-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.minExperienceYears === 0 ? 'Fresher' : `${job.minExperienceYears}+ Yrs`}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Salary / Stipend</span>
              <span className="font-extrabold text-emerald-700 mt-0.5 block">{job.salaryDisplay}</span>
            </div>
          </div>

          {/* Raw WhatsApp AI badge if applicable */}
          {job.isAiGenerated && (
            <div className="bg-brand-50 border border-brand-200 p-3 rounded-xl text-xs text-slate-700 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-900">AI Structured WhatsApp Requirement</span>
                <p className="text-[11px] text-slate-600 mt-0.5">This job listing was automatically parsed from a verified WhatsApp post and human-reviewed by the employer.</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Job Overview</h4>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && (
            <div>
              <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">Responsibilities</h4>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

          {/* Application Form */}
          <form onSubmit={handleApply} className="pt-4 border-t border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-navy-900">Quick Note to Recruiter (Optional)</label>
            <textarea
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              rows={2}
              placeholder="Highlight relevant CA/CMA/CS experience or articleship domain..."
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-normal"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => toggleSaveJob(job.id)}
                className="text-xs text-slate-600 hover:text-navy-900 font-semibold flex items-center space-x-1"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                <span>{isSaved ? 'Saved Job' : 'Save for Later'}</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-emerald-600/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Direct Application</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
