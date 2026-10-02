'use client';

import React, { useState } from 'react';
import { CompanyListing } from '../types';
import { useApp } from '../context/AppContext';
import { Building2, X, Lock, CheckCircle2, ShieldCheck, Send } from 'lucide-react';

interface CompanyEnquiryModalProps {
  company: CompanyListing | null;
  onClose: () => void;
}

export const CompanyEnquiryModal: React.FC<CompanyEnquiryModalProps> = ({ company, onClose }) => {
  const { submitCompanyEnquiry } = useApp();
  const [proposedPrice, setProposedPrice] = useState(company?.askingPriceDisplay || '');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!company) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    submitCompanyEnquiry(company.id, message, proposedPrice);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-navy-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Acquisition Enquiry</h3>
              <p className="text-xs text-slate-300 line-clamp-1">{company.listingTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {isSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-xl flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold">Enquiry Sent to Verified Seller!</p>
                <p>The seller will review your valuation proposal and grant access to ROC documents.</p>
              </div>
            </div>
          )}

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-500 block">Asking Valuation</span>
              <span className="font-extrabold text-emerald-700 text-sm">{company.askingPriceDisplay}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block font-medium">Incorporation</span>
              <span className="font-bold text-slate-800">{company.incorporationYear} ({company.registeredCity})</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Offer / Valuation Proposal</label>
            <input
              type="text"
              value={proposedPrice}
              onChange={(e) => setProposedPrice(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold"
              placeholder="e.g. ₹24.0 Lakhs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Message to Seller & Acquisition Intent</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              placeholder="State your business background, reason for acquisition (e.g. IT tender bidding, expansion), and document access request."
              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-normal"
            />
          </div>

          <div className="bg-slate-100 p-3 rounded-lg text-[11px] text-slate-600 flex items-start space-x-2">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Confidentiality Guarantee: Sensitive ROC, MOA/AOA, and GST documents remain encrypted until the seller accepts your enquiry.</span>
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
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Controlled Enquiry</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
