'use client';

import React from 'react';
import { JobListing } from '../types';
import { MapPin, Briefcase, Clock, ShieldCheck, Bookmark, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface JobCardProps {
  job: JobListing;
  onSelect: (job: JobListing) => void;
  onApply: (job: JobListing) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelect, onApply }) => {
  const { savedJobIds, toggleSaveJob } = useApp();
  const isSaved = savedJobIds.includes(job.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between relative group">
      
      <div>
        {/* Top Badges & Save Action */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              job.category === 'INTERNSHIP' 
                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {job.category}
            </span>

            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {job.jobType}
            </span>

            {job.isAiGenerated && (
              <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full flex items-center space-x-1 border border-slate-200">
                <Sparkles className="w-3 h-3 text-brand-600" />
                <span>AI Structured</span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className="text-slate-400 hover:text-emerald-600 p-1 rounded-md transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 text-emerald-600' : ''}`} />
          </button>
        </div>

        {/* Job Title & Company */}
        <h3
          onClick={() => onSelect(job)}
          className="text-base font-bold text-navy-900 group-hover:text-brand-600 cursor-pointer transition-colors line-clamp-1"
        >
          {job.title}
        </h3>

        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 mt-1">
          <span>{job.companyName}</span>
          {job.verificationStatus === 'VERIFIED' && (
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          )}
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-600">
          
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{job.minExperienceYears === 0 ? 'Fresher' : `${job.minExperienceYears}+ Yrs`}</span>
          </div>

        </div>

        {/* Salary Highlight */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Salary / Stipend</span>
            <span className="text-sm font-bold text-emerald-700">{job.salaryDisplay}</span>
          </div>

          <span className="text-[11px] text-slate-400 flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{job.postedAt}</span>
          </span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3 flex items-center space-x-2">
        <button
          onClick={() => onSelect(job)}
          className="flex-1 py-2 px-3 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onApply(job)}
          className="flex-1 py-2 px-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs transition-colors text-center shadow-sm"
        >
          Apply Now
        </button>
      </div>

    </div>
  );
};
