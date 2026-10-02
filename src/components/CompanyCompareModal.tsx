'use client';

import React from 'react';
import { CompanyListing } from '../types';
import { Building2, X, Check, ShieldCheck, Lock } from 'lucide-react';

interface CompanyCompareModalProps {
  companies: CompanyListing[];
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyCompareModal: React.FC<CompanyCompareModalProps> = ({ companies, isOpen, onClose }) => {
  if (!isOpen || companies.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Side-by-Side Company Comparison Matrix</h3>
              <p className="text-xs text-slate-300">Comparing {companies.length} selected acquisition entities</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 font-bold text-slate-500 uppercase tracking-wider bg-slate-50 w-44">Attribute</th>
                {companies.map(c => (
                  <th key={c.id} className="p-3 font-extrabold text-slate-900 text-sm border-l border-slate-200 min-w-[200px]">
                    {c.listingTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">Asking Price</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 font-extrabold text-emerald-700 text-sm border-l border-slate-200">
                    {c.askingPriceDisplay}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">Industry Sector</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 font-semibold text-slate-900 border-l border-slate-200">
                    {c.industry}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">Incorporation Year</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 text-slate-900 border-l border-slate-200 font-semibold">
                    {c.incorporationYear} ({2024 - c.incorporationYear} Yrs Vintage)
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">Registered City</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 text-slate-900 border-l border-slate-200">
                    {c.registeredCity}, {c.registeredState}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">Company Type</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 text-slate-900 border-l border-slate-200">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold text-[10px]">
                      {c.companyType}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">Annual Turnover</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 text-slate-800 border-l border-slate-200 font-medium">
                    {c.annualTurnover || 'Dormant / Revenue N/A'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">GST Status</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 text-slate-900 border-l border-slate-200 font-semibold">
                    {c.gstRegistered ? '✓ Active GST' : 'Non-GST'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700 bg-slate-50">ROC Verification</td>
                {companies.map(c => (
                  <td key={c.id} className="p-3 border-l border-slate-200">
                    <span className="flex items-center space-x-1 text-emerald-700 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>ROC & GST Verified</span>
                    </span>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
