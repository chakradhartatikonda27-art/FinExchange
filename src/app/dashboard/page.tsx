'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkspaceRole } from '../../types';
import { RecruiterAtsBoard } from '../../components/RecruiterAtsBoard';
import { CentralInbox } from '../../components/CentralInbox';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  MessageSquare, 
  Lock, 
  Bookmark, 
  Bell, 
  UserCheck, 
  FileText, 
  Search, 
  Plus,
  Eye,
  Check,
  Send,
  Clock,
  ChevronRight,
  Filter,
  Zap,
  Sparkles
} from 'lucide-react';
import { matchCompanyWithBuyers, matchJobWithProfessionals } from '../../lib/matchingEngine';

export default function DashboardPage() {
  const { 
    currentUser, 
    activeWorkspace, 
    switchWorkspace, 
    jobs, 
    companies, 
    applications, 
    enquiries, 
    termSheets,
    buyRequests, 
    professionals,
    savedJobIds, 
    savedCompanyIds, 
    verifyListing,
    approveNdaAccess
  } = useApp();

  const [candidateSubTab, setCandidateSubTab] = useState<'APPLICATIONS' | 'SAVED_JOBS' | 'INBOX'>('APPLICATIONS');
  const [recruiterSubTab, setRecruiterSubTab] = useState<'ATS_BOARD' | 'POSTED_JOBS' | 'INBOX'>('ATS_BOARD');
  const [professionalSubTab, setProfessionalSubTab] = useState<'MINI_CV' | 'INVITATIONS' | 'INBOX'>('MINI_CV');
  const [buyerSubTab, setBuyerSubTab] = useState<'ENQUIRIES' | 'SAVED_COMPANIES' | 'BUY_MANDATES' | 'INBOX'>('ENQUIRIES');
  const [sellerSubTab, setSellerSubTab] = useState<'MY_LISTINGS' | 'BUYER_BIDS' | 'NDA_VAULT' | 'ADMIN_VERIFICATION' | 'INBOX'>('MY_LISTINGS');

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));
  const savedCompanies = companies.filter(c => savedCompanyIds.includes(c.id));

  const jobCandidateMatches = jobs.length > 0 && professionals.length > 0 ? matchJobWithProfessionals(jobs[0], professionals) : [];
  const companyBuyerMatches = companies.length > 0 && buyRequests.length > 0 ? matchCompanyWithBuyers(companies[0], buyRequests) : [];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 pt-2 px-4 sm:px-6">
      
      {/* Top Banner & Dynamic Role Switcher Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                Active Intent: {activeWorkspace.replace('_', ' ')}
              </span>
              {currentUser.isIdentityVerified && (
                <span className="flex items-center space-x-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ICAI Credential Verified</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
              Personalized Workspace Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Showing customized tools, pipelines, and listings adapted specifically for your role.
            </p>
          </div>

          {/* Quick Role / Workspace Tabs inside Banner */}
          <div className="w-full md:w-auto bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 flex items-center justify-between sm:justify-start space-x-1 overflow-x-auto no-scrollbar">
            {(['CANDIDATE', 'RECRUITER', 'PROFESSIONAL', 'COMPANY_BUYER', 'COMPANY_SELLER'] as WorkspaceRole[]).map(ws => (
              <button
                key={ws}
                onClick={() => switchWorkspace(ws)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeWorkspace === ws
                    ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {ws === 'CANDIDATE' && 'Job Seeker'}
                {ws === 'RECRUITER' && 'Recruiter'}
                {ws === 'PROFESSIONAL' && 'Professional'}
                {ws === 'COMPANY_BUYER' && 'Buyer'}
                {ws === 'COMPANY_SELLER' && 'Seller'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ⚡ AI Smart Match Summary Feed Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-3xl p-5 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                ⚡ 2-Way AI Match Feed Active
              </span>
              <span className="text-xs text-slate-400">Sector, Budget & Qualification Scored</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">
              {activeWorkspace === 'CANDIDATE' || activeWorkspace === 'PROFESSIONAL'
                ? `⚡ ${jobCandidateMatches[0]?.matchScore || 95}% AI Profile Match with Top Industry Recruiters`
                : `⚡ ${companyBuyerMatches[0]?.matchScore || 92}% AI Mandate Overlap Found for Active Listings`}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {companyBuyerMatches[0]?.matchReasons.slice(0, 2).join(' • ') || 'Verified Sector, Budget Range & Verification Status Match'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs text-emerald-400 font-extrabold bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800">
            ⚡ High Match Score Active
          </span>
        </div>
      </div>

      {/* -------------------------------------------------------------
          WORKSPACE 1: CANDIDATE (JOB SEEKER)
      ------------------------------------------------------------- */}
      {activeWorkspace === 'CANDIDATE' && (
        <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{applications.length}</span>
                <span className="block text-xs text-slate-500 font-medium">Applications Sent</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{savedJobs.length}</span>
                <span className="block text-xs text-slate-500 font-medium">Saved Job Openings</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">2 Active</span>
                <span className="block text-xs text-slate-500 font-medium">WhatsApp Alert Filters</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-2xs flex items-center space-x-2 overflow-x-auto no-scrollbar touch-pan-x">
            <button
              onClick={() => setCandidateSubTab('APPLICATIONS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                candidateSubTab === 'APPLICATIONS' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              My Job Applications ({applications.length})
            </button>

            <button
              onClick={() => setCandidateSubTab('SAVED_JOBS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                candidateSubTab === 'SAVED_JOBS' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Saved Jobs ({savedJobs.length})
            </button>

            <button
              onClick={() => setCandidateSubTab('INBOX')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                candidateSubTab === 'INBOX' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Recruiter Messages
            </button>
          </div>

          {/* Content Views */}
          {candidateSubTab === 'APPLICATIONS' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Submitted Job & Articleship Applications</h3>
              <div className="space-y-3">
                {applications.map(app => (
                  <div key={app.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">{app.jobTitle}</span>
                      <span className="text-xs text-slate-500 block">{app.companyName} • Applied {app.appliedAt}</span>
                      {app.coverNote && (
                        <p className="text-xs text-slate-600 mt-1 italic">"{app.coverNote}"</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        app.stage === 'SHORTLISTED' ? 'bg-emerald-100 text-emerald-800' :
                        app.stage === 'INTERVIEW' ? 'bg-blue-100 text-blue-800' :
                        app.stage === 'SELECTED' ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        Stage: {app.stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {candidateSubTab === 'SAVED_JOBS' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Saved Job Listings</h3>
              {savedJobs.length === 0 ? (
                <p className="text-xs text-slate-500">No saved jobs yet.</p>
              ) : (
                <div className="space-y-3">
                  {savedJobs.map(job => (
                    <div key={job.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm block">{job.title}</span>
                        <span className="text-xs text-slate-500">{job.companyName} • {job.location} • {job.salaryDisplay}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Saved
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {candidateSubTab === 'INBOX' && <CentralInbox />}
        </div>
      )}

      {/* -------------------------------------------------------------
          WORKSPACE 2: RECRUITER / EMPLOYER
      ------------------------------------------------------------- */}
      {activeWorkspace === 'RECRUITER' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-2xs flex items-center space-x-2 overflow-x-auto no-scrollbar touch-pan-x">
            <button
              onClick={() => setRecruiterSubTab('ATS_BOARD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                recruiterSubTab === 'ATS_BOARD' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Candidate ATS Kanban Board
            </button>

            <button
              onClick={() => setRecruiterSubTab('POSTED_JOBS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                recruiterSubTab === 'POSTED_JOBS' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Active Posted Jobs ({jobs.length})
            </button>

            <button
              onClick={() => setRecruiterSubTab('INBOX')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                recruiterSubTab === 'INBOX' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Applicant Inbox
            </button>
          </div>

          {recruiterSubTab === 'ATS_BOARD' && <RecruiterAtsBoard />}

          {recruiterSubTab === 'POSTED_JOBS' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Manage Employer Job Listings</h3>
              <div className="space-y-3">
                {jobs.map(job => (
                  <div key={job.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{job.title}</span>
                      <span className="text-slate-500">{job.companyName} • {job.location} • Posted {job.postedAt}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-xs">
                        {job.applicationsCount} Applicants
                      </span>
                      <span className="bg-slate-200 text-slate-700 font-bold px-2.5 py-0.5 rounded text-[10px]">
                        {job.verificationStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recruiterSubTab === 'INBOX' && <CentralInbox />}
        </div>
      )}

      {/* -------------------------------------------------------------
          WORKSPACE 3: PROFESSIONAL (MINI-CV & DIRECT HIRE)
      ------------------------------------------------------------- */}
      {activeWorkspace === 'PROFESSIONAL' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-2xs flex items-center space-x-2 overflow-x-auto no-scrollbar touch-pan-x">
            <button
              onClick={() => setProfessionalSubTab('MINI_CV')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                professionalSubTab === 'MINI_CV' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              My Mini-CV Profile
            </button>

            <button
              onClick={() => setProfessionalSubTab('INVITATIONS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                professionalSubTab === 'INVITATIONS' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Inbound Hire Invitations (2)
            </button>

            <button
              onClick={() => setProfessionalSubTab('INBOX')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                professionalSubTab === 'INBOX' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Direct Client Inbox
            </button>
          </div>

          {professionalSubTab === 'MINI_CV' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
                    Chartered Accountant Profile
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-2">{currentUser.fullName}</h2>
                  <p className="text-xs text-slate-500">{currentUser.companyName} • ICAI Registration: {currentUser.icaiNumber}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Professional</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-extrabold text-slate-900">Key Expertise & Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Statutory Audit', 'GST Litigation', 'Corporate Tax Planning', 'Virtual CFO Services', 'IFRS Compliance'].map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-extrabold text-slate-900">Availability & Retainership</h4>
                  <p className="text-slate-600">Available for Part-Time Advisory & Virtual CFO Retainerships (Hyderabad / Remote).</p>
                  <span className="inline-block text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    ✓ Open to Direct Contact
                  </span>
                </div>
              </div>
            </div>
          )}

          {professionalSubTab === 'INVITATIONS' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Recruiter & Client Direct Invitations</h3>
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">Solenis GSS India - Virtual CFO Retainership</span>
                    <span className="text-slate-500">Inbound request for monthly GST review & internal control audit.</span>
                  </div>
                  <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {professionalSubTab === 'INBOX' && <CentralInbox />}
        </div>
      )}

      {/* -------------------------------------------------------------
          WORKSPACE 4: COMPANY BUYER (ACQUISITION)
      ------------------------------------------------------------- */}
      {activeWorkspace === 'COMPANY_BUYER' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-2xs flex items-center space-x-2 overflow-x-auto no-scrollbar touch-pan-x">
            <button
              onClick={() => setBuyerSubTab('ENQUIRIES')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                buyerSubTab === 'ENQUIRIES' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              My Submitted Enquiries & Bids ({enquiries.length})
            </button>

            <button
              onClick={() => setBuyerSubTab('SAVED_COMPANIES')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                buyerSubTab === 'SAVED_COMPANIES' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Saved Companies ({savedCompanies.length})
            </button>

            <button
              onClick={() => setBuyerSubTab('BUY_MANDATES')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 touch-manipulation ${
                buyerSubTab === 'BUY_MANDATES' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              My Acquisition Mandates ({buyRequests.length})
            </button>

            <button
              onClick={() => setBuyerSubTab('INBOX')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                buyerSubTab === 'INBOX' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Seller Inbox
            </button>
          </div>

          {buyerSubTab === 'ENQUIRIES' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Acquisition Enquiries & Document Access Requests</h3>
              <div className="space-y-3">
                {enquiries.map(enq => (
                  <div key={enq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">{enq.companyTitle}</span>
                      <span className="text-slate-500">Proposed Price: {enq.proposedPrice || 'Market Asking'} • Submitted {enq.submittedAt}</span>
                      <p className="text-slate-600 mt-1 italic">"{enq.message}"</p>
                    </div>
                    <span className="px-3 py-1 rounded-full font-bold bg-amber-100 text-amber-900">
                      Status: {enq.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* M&A Term Sheets Section */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Submitted Non-Binding LOI Term Sheets ({termSheets.length})</span>
                </h4>
                {termSheets.map(loi => (
                  <div key={loi.id} className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="font-extrabold text-emerald-400 text-sm block">{loi.companyTitle}</span>
                      <span className="text-slate-300">Valuation Offer: {loi.proposedValuationDisplay} • Due Diligence: {loi.dueDiligenceDays} Days</span>
                      <p className="text-slate-400 mt-1">Escrow: {loi.escrowPercent}% • Earnout: {loi.earnoutStructure}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {loi.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {buyerSubTab === 'SAVED_COMPANIES' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Saved Companies for Sale</h3>
              {savedCompanies.map(c => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block">{c.listingTitle}</span>
                    <span className="text-slate-500">{c.registeredCity} • {c.askingPriceDisplay}</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                    Saved
                  </span>
                </div>
              ))}
            </div>
          )}

          {buyerSubTab === 'BUY_MANDATES' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Published Buyer Requirements</h3>
              {buyRequests.map(req => (
                <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">{req.preferredIndustry} Company Wanted</span>
                  <span className="text-slate-500">Budget Range: {req.budgetDisplay} | Preferred City: {req.preferredLocation}</span>
                  <p className="text-slate-600 italic">"{req.specificRequirements}"</p>
                </div>
              ))}
            </div>
          )}

          {buyerSubTab === 'INBOX' && <CentralInbox />}
        </div>
      )}

      {/* -------------------------------------------------------------
          WORKSPACE 5: COMPANY SELLER
      ------------------------------------------------------------- */}
      {activeWorkspace === 'COMPANY_SELLER' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-2xs flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSellerSubTab('MY_LISTINGS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                sellerSubTab === 'MY_LISTINGS' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              My Entities for Sale ({companies.length})
            </button>

            <button
              onClick={() => setSellerSubTab('BUYER_BIDS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                sellerSubTab === 'BUYER_BIDS' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Buyer Bids & NDA Requests ({enquiries.length})
            </button>

            <button
              onClick={() => setSellerSubTab('ADMIN_VERIFICATION')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                sellerSubTab === 'ADMIN_VERIFICATION' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ROC Compliance Verification Queue
            </button>

            <button
              onClick={() => setSellerSubTab('INBOX')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                sellerSubTab === 'INBOX' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Buyer Inbox
            </button>
          </div>

          {sellerSubTab === 'MY_LISTINGS' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">My Listed Entities for Sale</h3>
              <div className="space-y-3">
                {companies.map(comp => (
                  <div key={comp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">{comp.listingTitle}</span>
                      <span className="text-slate-500">Asking Price: {comp.askingPriceDisplay} • {comp.registeredCity} • {comp.enquiriesCount} Buyer Bids</span>
                    </div>
                    <span className="px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                      {comp.isVerified ? 'ROC Verified' : 'Pending Review'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sellerSubTab === 'BUYER_BIDS' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Inbound Buyer Bids & Document Vault Requests</h3>
              <div className="space-y-3">
                {enquiries.map(enq => (
                  <div key={enq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="font-extrabold text-slate-900 block">{enq.buyerName} ({enq.buyerPhone})</span>
                      <span className="text-slate-500">Proposed Price: {enq.proposedPrice} for "{enq.companyTitle}"</span>
                      <p className="text-slate-600 mt-1 italic">"{enq.message}"</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {enq.status === 'DOCUMENT_ACCESS_GRANTED' ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                          ✓ NDA Vault Access Granted
                        </span>
                      ) : (
                        <button
                          onClick={() => approveNdaAccess(enq.companyId)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                        >
                          Grant Confidential Vault Access
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sellerSubTab === 'ADMIN_VERIFICATION' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Admin ROC & GST Verification Queue</h3>
              </div>
              {companies.map(comp => (
                <div key={comp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{comp.listingTitle}</span>
                    <span className="text-slate-500">CIN: U72900TG2019PTC134012 | GSTIN: 36AAACX1234F1Z9</span>
                  </div>
                  {comp.isVerified ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      ✓ Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => verifyListing(comp.id, 'COMPANY')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold"
                    >
                      Approve Verification
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {sellerSubTab === 'INBOX' && <CentralInbox />}
        </div>
      )}

    </div>
  );
}
