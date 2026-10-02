'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/JobCard';
import { CompanyCard } from '../components/CompanyCard';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { JobDetailsModal } from '../components/JobDetailsModal';
import { CompanyDetailsModal } from '../components/CompanyDetailsModal';
import { CompanyEnquiryModal } from '../components/CompanyEnquiryModal';
import { SellCompanyWizard } from '../components/SellCompanyWizard';
import { BuyRequestModal } from '../components/BuyRequestModal';
import { MiniCvModal } from '../components/MiniCvModal';
import { CompanyCompareModal } from '../components/CompanyCompareModal';
import { SmartSearchModal } from '../components/SmartSearchModal';
import { QuickPostModal } from '../components/QuickPostModal';
import { JobListing, CompanyListing, ProfessionalProfile } from '../types';
import { Search, Sparkles, Briefcase, Building2, Users, ArrowRight, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const { jobs, companies, professionals, buyRequests, comparedCompanyIds, clearComparedCompanies } = useApp();

  const [activeFeedTab, setActiveFeedTab] = useState<'ALL' | 'JOBS' | 'COMPANIES' | 'PROFESSIONALS'>('ALL');

  // Modals state
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyListing | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfessionalProfile | null>(null);
  const [enquiryCompany, setEnquiryCompany] = useState<CompanyListing | null>(null);
  const [isSellWizardOpen, setIsSellWizardOpen] = useState(false);
  const [isBuyRequestOpen, setIsBuyRequestOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isQuickPostOpen, setIsQuickPostOpen] = useState(false);

  const comparedCompanies = companies.filter(c => comparedCompanyIds.includes(c.id));

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 pt-2">
      
      {/* ==========================================
          1. HERO SECTION
         ========================================== */}
      <section className="text-center space-y-6 py-6 sm:py-10">
        
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 shadow-xs">
            CA • CS • CMA • Accounting • Audit • Tax • Finance • Corporate
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Jobs, Professionals & Companies — <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              All in One Place
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-700 font-bold max-w-3xl mx-auto">
            A professional marketplace built for CA, CS, CMA, accounting, audit, tax, finance and corporate professionals.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Find relevant jobs, discover qualified professionals, explore companies available for acquisition, or turn your WhatsApp opportunities into structured listings — all from one simple platform.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/jobs"
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-all shadow-md flex items-center space-x-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>Find Jobs</span>
          </Link>

          <Link
            href="/companies"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md flex items-center space-x-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Explore Companies</span>
          </Link>
        </div>

        {/* Single Primary Search Input */}
        <div 
          onClick={() => setIsSearchModalOpen(true)}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-2 border-2 border-slate-200 shadow-lg flex items-center gap-2 cursor-pointer hover:border-emerald-500 transition-colors mt-6"
        >
          <Search className="w-5 h-5 text-emerald-600 ml-3 flex-shrink-0" />
          <span className="w-full text-sm font-medium text-slate-400 py-2 text-left">
            Search jobs, companies, professionals (or type natural query)...
          </span>
          <span className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center space-x-1 flex-shrink-0">
            <span>Smart Search</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Trending Searches Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-1">
          <span className="font-bold text-slate-500">Trending:</span>
          {['CA Jobs in Hyderabad', 'IT Companies under ₹50L', 'CMA Trainees', 'Pharma Companies', 'Virtual CFOs'].map((tag) => (
            <button
              key={tag}
              onClick={() => setIsSearchModalOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold border border-slate-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

      </section>

      {/* ==========================================
          2. WHAT IS THIS PLATFORM?
         ========================================== */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Ecosystem Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">One Platform for Jobs, Talent & Business Opportunities</h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            This platform brings together the <strong className="text-white font-bold">finance, accounting, audit, taxation and corporate ecosystem</strong> in one searchable and organized marketplace.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Whether you are looking for a job, hiring a professional, buying or selling a company, or sharing a business opportunity, you can <strong className="text-emerald-400 font-bold">discover, connect and manage everything from one place.</strong>
          </p>
        </div>
      </section>

      {/* ==========================================
          3. WHO IS IT FOR? (4 TARGET AUDIENCE CARDS)
         ========================================== */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Who Is It For?</h2>
          <p className="text-xs sm:text-sm text-slate-500">Purpose-built workflows for every participant in the ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Job Seekers & Professionals */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">For Job Seekers & Professionals</h3>
              <p className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                CA • CS • CMA • Accountants • Auditors • Tax Professionals • Finance Professionals
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Find jobs and internships</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Create your professional profile & Mini-CV</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Showcase your skills and domain experience</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Apply & track applications directly</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Receive custom job alerts</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Find your next career opportunity.</span>
              <Link href="/jobs" className="text-xs font-bold text-emerald-600 hover:underline">Explore Jobs →</Link>
            </div>
          </div>

          {/* Card 2: Employers & Recruiters */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">For Companies, CA Firms & Recruiters</h3>
              <p className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 inline-block">
                Companies • CA Firms • Audit Firms • Accounting Firms • HR Teams • Recruiters • CEOs • CFOs
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Post jobs and articleships</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Find qualified CA, CS & CMA professionals</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Search verified candidate profiles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Recruiter ATS Kanban pipeline</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Find the right talent faster.</span>
              <Link href="/jobs?action=post" className="text-xs font-bold text-indigo-600 hover:underline">Post a Job →</Link>
            </div>
          </div>

          {/* Card 3: Business Buyers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">For Business Buyers</h3>
              <p className="text-xs font-semibold text-slate-500">Looking to acquire an existing company?</p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Discover companies available for acquisition</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Search by industry, location & budget</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Filter by registration year & company type</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Compare available companies side-by-side</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Submit acquisition requirements</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Find the right business opportunity.</span>
              <Link href="/companies" className="text-xs font-bold text-amber-600 hover:underline">Explore Companies →</Link>
            </div>
          </div>

          {/* Card 4: Company Owners & Sellers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">For Company Owners & Sellers</h3>
              <p className="text-xs font-semibold text-slate-500">Looking to sell or transfer a company?</p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>List your registered entity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Add business and ROC registration details</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Set your asking price</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Upload supporting documents securely in NDA Vault</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Receive buyer enquiries & bids</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Connect with potential buyers.</span>
              <button onClick={() => setIsSellWizardOpen(true)} className="text-xs font-bold text-emerald-700 hover:underline">
                Sell Company →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          4. THREE CORE EXPERIENCES
         ========================================== */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Three Core Experiences</h2>
          <p className="text-xs sm:text-sm text-slate-500">Explore our three dedicated marketplace domain pillars</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Jobs */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="space-y-2">
              <span className="text-2xl">💼</span>
              <h3 className="text-lg font-bold text-slate-900">Find Jobs</h3>
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                CA • CS • CMA • Audit • Tax • Accounting • Finance • FP&A
              </p>
              <p className="text-xs text-slate-500">Search by Role, Experience, Location, Salary, Skills, and Qualification.</p>
            </div>
            <Link
              href="/jobs"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1"
            >
              <span>Explore Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: Companies */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="space-y-2">
              <span className="text-2xl">🏢</span>
              <h3 className="text-lg font-bold text-slate-900">Discover Companies</h3>
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Acquisition • Purchase • Business Transfer
              </p>
              <p className="text-xs text-slate-500">Search by Industry, Location, Registration Year, Company Type, Budget, Business Status.</p>
            </div>
            <Link
              href="/companies"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1"
            >
              <span>Explore Companies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: Professionals */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="space-y-2">
              <span className="text-2xl">👥</span>
              <h3 className="text-lg font-bold text-slate-900">Discover Professionals</h3>
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                CA • CS • CMA • Auditing • Accounting • Taxation
              </p>
              <p className="text-xs text-slate-500">Search by Qualification, Experience, Skills, Location, Industry.</p>
            </div>
            <Link
              href="/directory"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1"
            >
              <span>Find Professionals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==========================================
          5. RECENTLY ADDED TABBED FEED
         ========================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Recently Added Listings</h2>
            <p className="text-xs text-slate-500">Latest job openings, companies for sale, and verified professionals</p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['ALL', 'JOBS', 'COMPANIES', 'PROFESSIONALS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFeedTab(tab)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeFeedTab === tab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Feed' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(activeFeedTab === 'ALL' || activeFeedTab === 'JOBS') && jobs.slice(0, activeFeedTab === 'JOBS' ? 6 : 2).map(job => (
            <JobCard key={job.id} job={job} onSelect={setSelectedJob} onApply={setSelectedJob} />
          ))}

          {(activeFeedTab === 'ALL' || activeFeedTab === 'COMPANIES') && companies.slice(0, activeFeedTab === 'COMPANIES' ? 6 : 2).map(comp => (
            <CompanyCard key={comp.id} company={comp} onSelect={setSelectedCompany} onEnquire={setEnquiryCompany} />
          ))}

          {(activeFeedTab === 'ALL' || activeFeedTab === 'PROFESSIONALS') && professionals.slice(0, activeFeedTab === 'PROFESSIONALS' ? 6 : 2).map(prof => (
            <ProfessionalCard key={prof.id} profile={prof} onContact={() => setSelectedProfile(prof)} />
          ))}
        </div>
      </section>

      {/* ==========================================
          6. BUYERS LOOKING FOR COMPANIES
         ========================================== */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
              Two-Sided Acquisition Marketplace
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Buyers Looking for Companies (Company Wanted)</h2>
            <p className="text-xs text-slate-400">Sellers can view active buyer acquisition criteria and budget demand</p>
          </div>
          <button
            onClick={() => setIsBuyRequestOpen(true)}
            className="text-xs text-emerald-400 font-bold hover:underline"
          >
            + Post Requirement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyRequests.map(req => (
            <div key={req.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <span className="font-bold text-emerald-400 text-sm">{req.preferredIndustry} Entity Wanted</span>
                <span className="text-xs font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                  Budget: {req.budgetDisplay}
                </span>
              </div>
              <p className="text-slate-300 font-medium">Buyer: {req.buyerName}</p>
              <p className="text-slate-400">Target Location: {req.preferredLocation} | Min Age: {req.minCompanyAgeYears} Yrs</p>
              <p className="text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-750">"{req.specificRequirements}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          7. WHY USE THE PLATFORM?
         ========================================== */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Why Use the Platform?</h2>
          <p className="text-xs sm:text-sm text-slate-500">Built for professional connections and trustworthy corporate transactions</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-800">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Structured Listings</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Professional Profiles</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Verified Information</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Smart Search & Filters</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>AI-Assisted Posting</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Secure Enquiries & NDA</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Job & Company Alerts</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Mobile-First Experience</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          8. HOW IT WORKS
         ========================================== */}
      <section className="text-center space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">How It Works</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-bold">Simple. Fast. Professional.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">01</span>
            <p className="font-bold text-slate-900 text-sm">Discover</p>
            <p className="text-slate-500 text-xs">Find jobs, professionals and companies.</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">02</span>
            <p className="font-bold text-slate-900 text-sm">Search</p>
            <p className="text-slate-500 text-xs">Use smart search and powerful filters.</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">03</span>
            <p className="font-bold text-slate-900 text-sm">Connect</p>
            <p className="text-slate-500 text-xs">Apply, enquire or connect directly.</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">04</span>
            <p className="font-bold text-slate-900 text-sm">Manage</p>
            <p className="text-slate-500 text-xs">Track applications, listings and enquiries from your dashboard.</p>
          </div>
        </div>
      </section>

      {/* ==========================================
          9. FROM WHATSAPP TO STRUCTURED OPPORTUNITIES (PLACED AT LAST POSITION)
         ========================================== */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="inline-block bg-white/20 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full backdrop-blur-sm">
            Core Innovation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Turn WhatsApp Posts Into Searchable Listings</h2>
          <p className="text-sm text-emerald-100 leading-relaxed">
            Jobs, internships, company sale opportunities and professional requirements are often shared through WhatsApp groups and channels.
          </p>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            But important information can quickly get buried among hundreds of messages. Our platform transforms these <strong className="text-white font-bold">unstructured WhatsApp posts into organized, searchable and actionable listings.</strong>
          </p>
        </div>

        {/* Workflow Diagram Banner */}
        <div className="bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-around gap-3 text-xs font-extrabold text-white text-center">
          <div className="px-3 py-1.5 rounded-xl bg-white/20">WhatsApp Post</div>
          <ArrowRight className="w-4 h-4 text-emerald-300 hidden sm:block" />
          <div className="px-3 py-1.5 rounded-xl bg-white/20">AI Extraction</div>
          <ArrowRight className="w-4 h-4 text-emerald-300 hidden sm:block" />
          <div className="px-3 py-1.5 rounded-xl bg-white/20">Review & Edit</div>
          <ArrowRight className="w-4 h-4 text-emerald-300 hidden sm:block" />
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white shadow-md">Publish Searchable Listing</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-sm font-extrabold text-white">Simply paste your WhatsApp post. No need to manually rewrite.</span>
          <button
            onClick={() => setIsQuickPostOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-white text-emerald-950 font-extrabold text-sm hover:bg-emerald-50 transition-all shadow-lg flex items-center space-x-2 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Paste WhatsApp Post</span>
          </button>
        </div>
      </section>

      {/* ==========================================
          10. FINAL CTA SECTION
         ========================================== */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-slate-800">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Your Next Opportunity Starts Here</h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Whether you're looking for your next career opportunity, hiring talent, exploring a business acquisition, or listing a company for sale — everything starts here.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/jobs"
            className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-extrabold text-sm hover:bg-slate-100 transition-all shadow-md"
          >
            Explore Jobs
          </Link>
          <Link
            href="/companies"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition-all shadow-md"
          >
            Explore Companies
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs font-bold text-emerald-400">
          Find Opportunities. Hire Talent. Discover Businesses.
        </div>
      </section>

      {/* Floating Compare Banner */}
      {comparedCompanies.length > 0 && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-4 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-xs font-bold text-emerald-400">{comparedCompanies.length} Companies Selected for Comparison</span>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
          >
            Compare Now
          </button>
          <button onClick={clearComparedCompanies} className="text-slate-400 hover:text-white text-xs">Clear</button>
        </div>
      )}

      {/* MODALS */}
      <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      <CompanyDetailsModal company={selectedCompany} onClose={() => setSelectedCompany(null)} onEnquire={setEnquiryCompany} />
      <CompanyEnquiryModal company={enquiryCompany} onClose={() => setEnquiryCompany(null)} />
      <MiniCvModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} onInviteToJob={() => setSelectedProfile(null)} />
      <CompanyCompareModal companies={comparedCompanies} isOpen={isCompareModalOpen} onClose={() => setIsCompareModalOpen(false)} />
      <SellCompanyWizard isOpen={isSellWizardOpen} onClose={() => setIsSellWizardOpen(false)} />
      <BuyRequestModal isOpen={isBuyRequestOpen} onClose={() => setIsBuyRequestOpen(false)} />
      <SmartSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      <QuickPostModal isOpen={isQuickPostOpen} onClose={() => setIsQuickPostOpen(false)} />

    </div>
  );
}
