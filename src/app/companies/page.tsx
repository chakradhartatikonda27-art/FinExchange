'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompanyCard } from '../../components/CompanyCard';
import { CompanyDetailsModal } from '../../components/CompanyDetailsModal';
import { CompanyEnquiryModal } from '../../components/CompanyEnquiryModal';
import { SellCompanyWizard } from '../../components/SellCompanyWizard';
import { BuyRequestModal } from '../../components/BuyRequestModal';
import { CompanyListing } from '../../types';
import { Search, Building2, PlusCircle, TrendingUp } from 'lucide-react';

export default function CompaniesPage() {
  const { companies, buyRequests } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('ALL');
  const [selectedCompany, setSelectedCompany] = useState<CompanyListing | null>(null);
  const [enquiryCompany, setEnquiryCompany] = useState<CompanyListing | null>(null);
  const [isSellWizardOpen, setIsSellWizardOpen] = useState(false);
  const [isBuyRequestOpen, setIsBuyRequestOpen] = useState(false);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.registeredCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = industryFilter === 'ALL' || company.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 pt-2">
      
      {/* Title & Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Buy & Sell Marketplace</h1>
          <p className="text-xs text-slate-500">Registered Pvt Ltd & LLP entities available for business acquisition</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsBuyRequestOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center space-x-1.5 transition-colors border border-slate-200"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Post Buy Requirement</span>
          </button>

          <button
            onClick={() => setIsSellWizardOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Company for Sale</span>
          </button>
        </div>
      </div>

      {/* Clean Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search industry or city (e.g. 2019 Pvt Ltd IT Hyderabad)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium"
          />
        </div>

        <div>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
          >
            <option value="ALL">All Industry Sectors</option>
            <option value="IT & Software">IT & Software</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>
      </div>

      {/* Grid Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map(company => (
          <CompanyCard
            key={company.id}
            company={company}
            onSelect={setSelectedCompany}
            onEnquire={setEnquiryCompany}
          />
        ))}
      </div>

      {/* Buyer Requirements Block */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Buyer Requirements</h3>
            <p className="text-xs text-slate-500">Specific company acquisition requests submitted by buyers</p>
          </div>
          <button
            onClick={() => setIsBuyRequestOpen(true)}
            className="text-xs font-bold text-emerald-600 hover:underline"
          >
            + Post Requirement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {buyRequests.map(req => (
            <div key={req.id} className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{req.preferredIndustry} Entity Wanted</span>
                <span className="text-emerald-700">{req.budgetDisplay}</span>
              </div>
              <p className="text-slate-600">Location: {req.preferredLocation} | Min Age: {req.minCompanyAgeYears} Years</p>
              <p className="text-slate-500 italic">"{req.specificRequirements}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <CompanyDetailsModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onEnquire={setEnquiryCompany}
      />

      <CompanyEnquiryModal
        company={enquiryCompany}
        onClose={() => setEnquiryCompany(null)}
      />

      <SellCompanyWizard
        isOpen={isSellWizardOpen}
        onClose={() => setIsSellWizardOpen(false)}
      />

      <BuyRequestModal
        isOpen={isBuyRequestOpen}
        onClose={() => setIsBuyRequestOpen(false)}
      />

    </div>
  );
}
