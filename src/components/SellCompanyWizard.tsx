'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, X, Check, ArrowRight, ArrowLeft, ShieldCheck, FileCheck } from 'lucide-react';

interface SellCompanyWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellCompanyWizard: React.FC<SellCompanyWizardProps> = ({ isOpen, onClose }) => {
  const { addCompany } = useApp();
  const [step, setStep] = useState(1);

  const [companyType, setCompanyType] = useState<'Private Limited' | 'LLP' | 'Partnership Firm' | 'Proprietorship'>('Private Limited');
  const [industry, setIndustry] = useState('IT & Software');
  const [incorporationYear, setIncorporationYear] = useState(2020);
  const [registeredCity, setRegisteredCity] = useState('Hyderabad');
  const [registeredState, setRegisteredState] = useState('Telangana');
  const [askingPriceDisplay, setAskingPriceDisplay] = useState('₹25.0 Lakhs');
  const [askingPrice, setAskingPrice] = useState(2500000);
  const [businessStatus, setBusinessStatus] = useState<'Active Business' | 'Dormant Company' | 'Shell Entity' | 'Clean Track Record'>('Active Business');
  const [description, setDescription] = useState('');
  const [gstRegistered, setGstRegistered] = useState(true);

  if (!isOpen) return null;

  const handleFinish = () => {
    addCompany({
      listingTitle: `${incorporationYear} Registered ${companyType} ${industry} Company`,
      companyType,
      industry: industry as any,
      incorporationYear: Number(incorporationYear),
      registeredCity,
      registeredState,
      askingPrice: Number(askingPrice),
      askingPriceDisplay,
      businessStatus,
      gstRegistered,
      description: description || `Clean ${companyType} entity incorporated in ${incorporationYear} at ${registeredCity}. All ROC returns up to date.`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-navy-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Sell / List Company for Acquisition</h3>
              <p className="text-xs text-slate-300">Step {step} of 4: Confidential Verification Wizard</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Bar */}
        <div className="bg-slate-100 h-1.5 w-full">
          <div
            className="bg-emerald-600 h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Wizard Body */}
        <div className="p-6 space-y-6">

          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-navy-900">Step 1: Entity & Industry Details</h4>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Constitution Type</label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                >
                  <option value="Private Limited">Private Limited (Pvt Ltd)</option>
                  <option value="LLP">Limited Liability Partnership (LLP)</option>
                  <option value="Partnership Firm">Partnership Firm</option>
                  <option value="Proprietorship">Proprietorship Entity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Industry Sector</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                >
                  <option value="IT & Software">IT & Software</option>
                  <option value="Pharmaceuticals">Pharmaceuticals & Healthcare</option>
                  <option value="Manufacturing">Manufacturing & Industrial</option>
                  <option value="Financial Services">Financial Services / NBFC</option>
                  <option value="Trading & Distribution">Trading & Distribution</option>
                  <option value="Logistics">Logistics & Supply Chain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Incorporation Year</label>
                <input
                  type="number"
                  value={incorporationYear}
                  onChange={(e) => setIncorporationYear(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-navy-900">Step 2: Location & Business Activity</h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registered City</label>
                  <input
                    type="text"
                    value={registeredCity}
                    onChange={(e) => setRegisteredCity(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registered State</label>
                  <input
                    type="text"
                    value={registeredState}
                    onChange={(e) => setRegisteredState(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Operating Status</label>
                <select
                  value={businessStatus}
                  onChange={(e) => setBusinessStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                >
                  <option value="Active Business">Active Business (Running Revenue & Employees)</option>
                  <option value="Clean Track Record">Clean Entity (No active operations, clean balance sheet)</option>
                  <option value="Dormant Company">Dormant Company (ROC compliant)</option>
                  <option value="Shell Entity">Shell Entity</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="gst"
                  checked={gstRegistered}
                  onChange={(e) => setGstRegistered(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="gst" className="text-xs font-bold text-slate-700">GST Registration Active & Filings Current</label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-navy-900">Step 3: Valuation & Overview</h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asking Price Display Text</label>
                <input
                  type="text"
                  value={askingPriceDisplay}
                  onChange={(e) => setAskingPriceDisplay(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
                  placeholder="e.g. ₹25.0 Lakhs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Description & Highlights</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe clean balance sheet, active bank accounts, zero litigation, and asset overview..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-normal"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-navy-900">Step 4: Preview & Verification Submission</h4>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-800 space-y-1">
                <p className="font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Ready for Verification Review</span>
                </p>
                <p>Listing: <strong>{incorporationYear} Registered {companyType} ({registeredCity})</strong></p>
                <p>Valuation: <strong>{askingPriceDisplay}</strong></p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Our CA admin compliance team will verify CIN/PAN & ROC filings before granting verified status.</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center space-x-1"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-md shadow-emerald-600/30"
              >
                <Check className="w-4 h-4" />
                <span>Submit Listing</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
