'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, X, Send, CheckCircle2 } from 'lucide-react';

interface BuyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyRequestModal: React.FC<BuyRequestModalProps> = ({ isOpen, onClose }) => {
  const { addBuyRequest } = useApp();

  const [preferredIndustry, setPreferredIndustry] = useState('IT & Software');
  const [preferredLocation, setPreferredLocation] = useState('Hyderabad');
  const [budgetDisplay, setBudgetDisplay] = useState('₹20L – ₹50L');
  const [minCompanyAgeYears, setMinCompanyAgeYears] = useState(3);
  const [specificRequirements, setSpecificRequirements] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBuyRequest({
      preferredIndustry,
      preferredLocation,
      budgetDisplay,
      minCompanyAgeYears: Number(minCompanyAgeYears),
      specificRequirements: specificRequirements || 'Active company clean balance sheet requirement.'
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-navy-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden my-6">
        
        <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Post Acquisition Requirement</h3>
              <p className="text-xs text-slate-300">Target company buy parameters</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {isSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-xl flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-xs font-bold">Acquisition Requirement Posted to Seller Registry!</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Industry</label>
            <select
              value={preferredIndustry}
              onChange={(e) => setPreferredIndustry(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
            >
              <option value="IT & Software">IT & Software</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Location</label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                placeholder="e.g. Hyderabad"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Min Age (Years)</label>
              <input
                type="number"
                value={minCompanyAgeYears}
                onChange={(e) => setMinCompanyAgeYears(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Budget Range</label>
            <input
              type="text"
              value={budgetDisplay}
              onChange={(e) => setBudgetDisplay(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
              placeholder="e.g. ₹20L – ₹50L"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Specific Acquisition Criteria</label>
            <textarea
              value={specificRequirements}
              onChange={(e) => setSpecificRequirements(e.target.value)}
              rows={3}
              placeholder="Specify ROC compliance status, active GST requirement, turnover minimums..."
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-normal"
            />
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Requirement</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
