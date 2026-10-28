'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { matchCompanyWithBuyers, matchJobWithProfessionals } from '../lib/matchingEngine';
import { Zap, Briefcase, Building2, UserCheck, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const MatchCenter: React.FC = () => {
  const { activeWorkspace, jobs, companies, buyRequests, professionals, serviceRequirements } = useApp();

  const jobMatches = jobs.length > 0 && professionals.length > 0 ? matchJobWithProfessionals(jobs[0], professionals) : [];
  const companyMatches = companies.length > 0 && buyRequests.length > 0 ? matchCompanyWithBuyers(companies[0], buyRequests) : [];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                Match Center
              </span>
              <span className="text-xs text-slate-300 font-medium">Personalized for {activeWorkspace.replace('_', ' ')}</span>
            </div>
            <h2 className="text-lg font-black text-white mt-1">Smart Opportunity Match Digest</h2>
          </div>
        </div>

        <span className="text-xs text-emerald-400 font-extrabold bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/80 shrink-0">
          ⚡ Live 2-Way Scoring
        </span>
      </div>

      {/* Dynamic Workspace Match Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Card 1: Jobs & Hiring Matches */}
        <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3 flex flex-col justify-between hover:border-emerald-500/60 transition-all">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Job Marketplace</span>
              <span className="bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded text-[10px]">
                {jobs.length} Active
              </span>
            </div>
            <h3 className="font-extrabold text-white text-sm flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Matching Job Opportunities</span>
            </h3>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {jobMatches[0]?.matchScore
                ? `⚡ ${jobMatches[0].matchScore}% Profile Match with ${jobs[0]?.title || 'CA Senior Auditor'} at ${jobs[0]?.companyName || 'Deloitte'}.`
                : `4 High-match job openings in Statutory Audit, GST litigation & FP&A.`}
            </p>
          </div>

          <Link
            href="/jobs"
            className="pt-2 text-emerald-400 font-extrabold hover:underline flex items-center justify-between"
          >
            <span>View Matching Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Company Acquisition Matches */}
        <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3 flex flex-col justify-between hover:border-emerald-500/60 transition-all">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">M&A Acquisition</span>
              <span className="bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded text-[10px]">
                {companies.length} Listed
              </span>
            </div>
            <h3 className="font-extrabold text-white text-sm flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Acquisition & Companies Wanted</span>
            </h3>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {companyMatches[0]?.matchScore
                ? `⚡ ${companyMatches[0].matchScore}% Target Overlap: ${buyRequests[0]?.preferredIndustry} company mandate.`
                : `2 Active buyer mandates match 2019 Registered Private Limited IT entities.`}
            </p>
          </div>

          <Link
            href="/companies"
            className="pt-2 text-amber-400 font-extrabold hover:underline flex items-center justify-between"
          >
            <span>View Acquisition Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Professional Services & Retainerships */}
        <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3 flex flex-col justify-between hover:border-emerald-500/60 transition-all">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Service Retainerships</span>
              <span className="bg-purple-500/20 text-purple-300 font-extrabold px-2 py-0.5 rounded text-[10px]">
                {serviceRequirements.length} Active
              </span>
            </div>
            <h3 className="font-extrabold text-white text-sm flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Virtual CFO & GST Advisory</span>
            </h3>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {serviceRequirements[0]
                ? `⚡ ${serviceRequirements[0].serviceType} needed in ${serviceRequirements[0].location} (${serviceRequirements[0].budgetDisplay}).`
                : `7 Qualified professionals match retainership criteria for Virtual CFO.`}
            </p>
          </div>

          <Link
            href="/directory"
            className="pt-2 text-purple-400 font-extrabold hover:underline flex items-center justify-between"
          >
            <span>View Service Requirements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
