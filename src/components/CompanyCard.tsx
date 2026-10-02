'use client';

import React from 'react';
import { CompanyListing } from '../types';
import { matchCompanyWithBuyers, calculateListingQualityScore } from '../lib/matchingEngine';
import { Building2, Calendar, MapPin, ShieldCheck, FileText, ArrowUpRight, Lock, CheckSquare, Square, Shield, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CompanyCardProps {
  company: CompanyListing;
  onSelect: (company: CompanyListing) => void;
  onEnquire: (company: CompanyListing) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSelect, onEnquire }) => {
  const { buyRequests, comparedCompanyIds, toggleCompareCompany } = useApp();
  const isCompared = comparedCompanyIds.includes(company.id);

  const matches = matchCompanyWithBuyers(company, buyRequests);
  const topMatch = matches.length > 0 ? matches[0] : null;
  const quality = calculateListingQualityScore(company, 'COMPANY');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between relative group">
      
      <div>
        {/* Top Entity Bar & Compare Checkbox */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
              {company.companyType}
            </span>
            {topMatch && (
              <span className="text-[10px] font-extrabold text-white bg-emerald-600 px-2.5 py-0.5 rounded-full shadow-xs flex items-center space-x-0.5">
                <Zap className="w-3 h-3 text-emerald-200 fill-emerald-200" />
                <span>⚡ {topMatch.matchScore}% AI Match</span>
              </span>
            )}
            {company.isSellerContactMasked && (
              <span className="text-[9px] font-bold text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                <Shield className="w-2.5 h-2.5 text-emerald-600" />
                <span>Protected</span>
              </span>
            )}
          </div>

          <button
            onClick={() => toggleCompareCompany(company.id)}
            className={`text-xs font-semibold px-2 py-1 rounded-md flex items-center space-x-1 transition-colors ${
              isCompared ? 'bg-emerald-600 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {isCompared ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
            <span>Compare</span>
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(company)}
          className="text-base font-bold text-slate-900 group-hover:text-emerald-700 cursor-pointer transition-colors line-clamp-2"
        >
          {company.listingTitle}
        </h3>

        {/* Attributes Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{company.industry}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>Inc: {company.incorporationYear}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{company.registeredCity}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{company.documentsCount} Vault Files</span>
          </div>
        </div>

        {/* Listing Completeness Quality Indicator */}
        <div className="mt-3.5 space-y-1">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
            <span>Listing Completeness</span>
            <span className="text-slate-700 font-extrabold">{quality.score}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full ${quality.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${quality.score}%` }} 
            />
          </div>
        </div>

        {/* Valuation Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-800 uppercase font-bold block">Asking Price</span>
            <span className="text-lg font-extrabold text-emerald-900">{company.askingPriceDisplay}</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 block font-semibold">ROC / GST</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center space-x-2">
        <button
          onClick={() => onSelect(company)}
          className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onEnquire(company)}
          className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-xs transition-colors"
        >
          <span>Send Enquiry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
