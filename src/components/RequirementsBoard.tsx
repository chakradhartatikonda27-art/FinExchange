'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProfessionalServiceRequirement } from '../types';
import { Briefcase, Building2, UserCheck, Plus, CheckCircle2, ShieldCheck, Sparkles, Filter, X } from 'lucide-react';

export const RequirementsBoard: React.FC = () => {
  const { buyRequests, serviceRequirements, addServiceRequirement } = useApp();
  const [filterType, setFilterType] = useState<'ALL' | 'COMPANIES_WANTED' | 'SERVICES_NEEDED'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [serviceType, setServiceType] = useState<ProfessionalServiceRequirement['serviceType']>('GST Consultant');
  const [industry, setIndustry] = useState('IT & Software');
  const [location, setLocation] = useState('Hyderabad / Remote');
  const [budgetDisplay, setBudgetDisplay] = useState('₹75,000 / Month');
  const [description, setDescription] = useState('');
  const [isPosted, setIsPosted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    addServiceRequirement({
      serviceType,
      industry,
      location,
      budgetDisplay,
      description
    });

    setIsPosted(true);
    setTimeout(() => {
      setIsPosted(false);
      setIsModalOpen(false);
      setDescription('');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-emerald-400 px-2.5 py-0.5 rounded">
              First-Class Objects
            </span>
            <span className="text-xs text-slate-500 font-semibold">Acquisition & Service Demands</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">Structured Requirements Board</h2>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all touch-manipulation"
          >
            <Plus className="w-4 h-4" />
            <span>+ Post Service Requirement</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl text-xs font-bold overflow-x-auto no-scrollbar touch-pan-x">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            filterType === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Requirements ({buyRequests.length + serviceRequirements.length})
        </button>

        <button
          onClick={() => setFilterType('COMPANIES_WANTED')}
          className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            filterType === 'COMPANIES_WANTED' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Companies Wanted ({buyRequests.length})
        </button>

        <button
          onClick={() => setFilterType('SERVICES_NEEDED')}
          className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            filterType === 'SERVICES_NEEDED' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Professional Services Needed ({serviceRequirements.length})
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Company Acquisition Requirements (Companies Wanted) */}
        {(filterType === 'ALL' || filterType === 'COMPANIES_WANTED') && (
          buyRequests.map(req => (
            <div key={req.id} className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    Company Acquisition Requirement
                  </span>
                  <h3 className="font-extrabold text-white text-sm mt-1.5">{req.preferredIndustry} Company Wanted</h3>
                </div>

                <span className="text-xs font-extrabold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  {req.budgetDisplay}
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <p><strong className="text-white">Buyer:</strong> {req.buyerName}</p>
                <p><strong className="text-white">Target Location:</strong> {req.preferredLocation} | Min Age: {req.minCompanyAgeYears} Yrs</p>
                <p className="text-slate-400 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1">"{req.specificRequirements}"</p>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-800">
                <span className="text-slate-400">Posted {req.postedAt}</span>
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Matches Active Seller Listings</span>
                </span>
              </div>
            </div>
          ))
        )}

        {/* Professional Service Requirements */}
        {(filterType === 'ALL' || filterType === 'SERVICES_NEEDED') && (
          serviceRequirements.map(srv => (
            <div key={srv.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs hover:border-emerald-500 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Professional Service Need
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-1.5">{srv.serviceType} Requirement</h3>
                </div>

                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {srv.budgetDisplay}
                </span>
              </div>

              <div className="text-xs text-slate-700 space-y-1">
                <p><strong className="text-slate-900">Organization:</strong> {srv.posterName}</p>
                <p><strong className="text-slate-900">Industry & Location:</strong> {srv.industry} • {srv.location}</p>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-1">{srv.description}</p>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-100">
                <span className="text-slate-400">Posted {srv.postedAt}</span>
                <span className="text-emerald-700 font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Intermediary Privacy Protected</span>
                </span>
              </div>
            </div>
          ))
        )}

      </div>

      {/* Post Service Requirement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden my-6">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Post Professional Service Requirement</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {isPosted && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl flex items-center space-x-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Service Requirement Published to Network!</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-900 mb-1">Required Service Category</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                >
                  <option value="GST Consultant">GST Consultant (Monthly Returns & Appeals)</option>
                  <option value="Virtual CFO">Virtual CFO (Retainership & MIS Governance)</option>
                  <option value="Internal Auditor">Internal Auditor (Control Review & Risk Matrix)</option>
                  <option value="ROC Compliance Specialist">ROC Compliance Specialist (Companies Act Filings)</option>
                  <option value="Taxation Advisor">Taxation Advisor (Direct Tax & ITAT Litigation)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Industry Sector</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. IT, Manufacturing, Healthcare"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">Location / Remote</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Hyderabad / Remote"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Proposed Retainership Budget</label>
                <input
                  type="text"
                  value={budgetDisplay}
                  onChange={(e) => setBudgetDisplay(e.target.value)}
                  placeholder="e.g. ₹50,000 / Month"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Requirement Scope & Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe key responsibilities, expected frequency, and deliverables..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish Requirement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
