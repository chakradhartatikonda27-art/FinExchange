'use client';

import React, { useState } from 'react';
import { CompanyListing, TermSheetLOI } from '../types';
import { useApp } from '../context/AppContext';
import { FileText, ShieldCheck, CheckCircle2, Lock, X, DollarSign, Calendar, AlertCircle, Printer, Send } from 'lucide-react';

interface TermSheetGeneratorModalProps {
  company: CompanyListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TermSheetGeneratorModal: React.FC<TermSheetGeneratorModalProps> = ({ company, isOpen, onClose }) => {
  const { currentUser, submitTermSheet } = useApp();

  const [proposedValuation, setProposedValuation] = useState<number>(company?.askingPrice || 2500000);
  const [dueDiligenceDays, setDueDiligenceDays] = useState<number>(30);
  const [exclusivityDays, setExclusivityDays] = useState<number>(45);
  const [workingCapitalTarget, setWorkingCapitalTarget] = useState<string>('Zero Debt & Net Positive Working Capital (₹5.0L Target)');
  const [escrowPercent, setEscrowPercent] = useState<number>(10);
  const [earnoutStructure, setEarnoutStructure] = useState<string>('80% upfront upon ROC transfer, 20% milestone earnout at 6 months');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !company) return null;

  const handleSubmitLOI = (e: React.FormEvent) => {
    e.preventDefault();
    const loi: Partial<TermSheetLOI> = {
      companyId: company.id,
      companyTitle: company.listingTitle,
      sellerId: company.sellerId,
      proposedValuation,
      proposedValuationDisplay: `₹${(proposedValuation / 100000).toFixed(1)} Lakhs`,
      dueDiligenceDays,
      exclusivityDays,
      workingCapitalTarget,
      earnoutStructure,
      escrowPercent,
      ndaSigned: true
    };

    submitTermSheet(loi);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                  M&A Non-Binding Term Sheet
                </span>
                <span className="text-xs text-slate-300 font-semibold">Standard LOI Builder</span>
              </div>
              <h2 className="text-base font-extrabold text-white mt-1 leading-tight">
                {company.listingTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmitLOI} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">

          {isSubmitted && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-extrabold text-sm block">Term Sheet / LOI Transmitted!</span>
                <span className="text-xs text-emerald-700">Submitted directly to Seller Dashboard for review.</span>
              </div>
            </div>
          )}

          {/* Asking vs Valuation Header */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Seller Asking Price</span>
              <span className="text-lg font-black text-slate-900">{company.askingPriceDisplay}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Entity</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                {company.companyType} ({company.registeredCity})
              </span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Proposed Valuation */}
            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Proposed Offer Valuation (INR)</label>
              <input
                type="number"
                value={proposedValuation}
                onChange={(e) => setProposedValuation(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-extrabold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                step="50000"
              />
              <span className="text-[10px] text-slate-500 block">
                Offer Equivalent: <strong>₹{(proposedValuation / 100000).toFixed(2)} Lakhs</strong>
              </span>
            </div>

            {/* Due Diligence Days */}
            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Due Diligence Period (Days)</label>
              <select
                value={dueDiligenceDays}
                onChange={(e) => setDueDiligenceDays(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
              >
                <option value={15}>15 Days (Fast-Track)</option>
                <option value={30}>30 Days (Standard Audit & ROC)</option>
                <option value={60}>60 Days (Comprehensive Audit)</option>
              </select>
            </div>

            {/* Exclusivity Period */}
            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Exclusivity Window (Days)</label>
              <select
                value={exclusivityDays}
                onChange={(e) => setExclusivityDays(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
              >
                <option value={30}>30 Days Exclusivity</option>
                <option value={45}>45 Days Exclusivity</option>
                <option value={60}>60 Days Exclusivity</option>
              </select>
            </div>

            {/* Escrow Retention Percent */}
            <div className="space-y-1">
              <label className="font-bold text-slate-900 block">Escrow Holdback (% of Price)</label>
              <select
                value={escrowPercent}
                onChange={(e) => setEscrowPercent(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
              >
                <option value={5}>5% Escrow Retention</option>
                <option value={10}>10% Standard Escrow Retention</option>
                <option value={15}>15% Escrow Retention</option>
              </select>
            </div>

          </div>

          {/* Working Capital Target & Earnout */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Working Capital & Liability Target Clause</label>
              <input
                type="text"
                value={workingCapitalTarget}
                onChange={(e) => setWorkingCapitalTarget(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-800 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Earnout & Payment Schedule Terms</label>
              <input
                type="text"
                value={earnoutStructure}
                onChange={(e) => setEarnoutStructure(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-800 text-xs"
              />
            </div>
          </div>

          {/* Legal Notice */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1">
            <span className="font-extrabold text-emerald-400 block flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standard Non-Binding LOI Protocol</span>
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              This Term Sheet constitutes an expression of intent for corporate acquisition and is non-binding except for Exclusivity and Confidentiality obligations.
            </p>
          </div>

          {/* Footer CTAs */}
          <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-2 shadow-md shadow-emerald-600/20"
            >
              <Send className="w-4 h-4" />
              <span>Submit LOI Term Sheet to Seller</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
