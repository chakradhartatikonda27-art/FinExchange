'use client';

import React, { useState } from 'react';
import { CompanyListing } from '../types';
import { SecureDocumentRoomModal } from './SecureDocumentRoomModal';
import { TermSheetGeneratorModal } from './TermSheetGeneratorModal';
import { SmartMatchDrawer } from './SmartMatchDrawer';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  X, 
  ArrowUpRight, 
  FileText, 
  CheckCircle2,
  Shield,
  MessageSquare,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CompanyDetailsModalProps {
  company: CompanyListing | null;
  onClose: () => void;
  onEnquire: (company: CompanyListing) => void;
}

export const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({ company, onClose, onEnquire }) => {
  const { requestNdaAccess } = useApp();
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const [isTermSheetModalOpen, setIsTermSheetModalOpen] = useState(false);
  const [isMatchDrawerOpen, setIsMatchDrawerOpen] = useState(false);

  if (!company) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
        <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                {company.companyType}
              </span>
              <span className="text-xs text-slate-300 font-semibold">{company.industry}</span>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Privacy Shield Banner */}
          <div className="bg-slate-900/95 border-b border-slate-800 text-white px-6 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300 text-[11px]">
                Seller Privacy Active: <strong className="text-emerald-300">{company.sellerName || `Seller #${company.sellerId.substring(0, 7)}`}</strong> (Direct phone & email hidden)
              </span>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
              PLATFORM INTERMEDIARY
            </span>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">{company.listingTitle}</h2>
              <p className="text-xs text-slate-500 mt-1">
                Registered in {company.registeredCity}, {company.registeredState} • Inc. Year {company.incorporationYear}
              </p>
            </div>

            {/* Pricing Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">Asking Price</span>
                <span className="text-2xl font-extrabold text-emerald-900">{company.askingPriceDisplay}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Operating Status</span>
                <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block mt-0.5">
                  {company.businessStatus}
                </span>
              </div>
            </div>

            {/* Granular Verification Levels Checklist */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Granular Verification Checks</span>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Company Details</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ROC Filings</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>GST Active</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Documents Uploaded</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Company Description</h4>
              <p className="text-xs text-slate-700 leading-relaxed">{company.description}</p>
            </div>

            {/* Privacy & Communication Notice */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Intermediary Messaging Protocol</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                To protect sellers from unsolicited cold calls and spam, direct phone numbers and emails are never published. Submitting an enquiry sends a direct message to the seller's dashboard inbox.
              </p>
            </div>

            {/* NDA Vault Document Access */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center space-x-1.5 text-emerald-400">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Confidential Document Vault ({company.documentsCount} Uploaded Files)</span>
                </span>
                <span className="text-[10px] bg-slate-800 px-2.5 py-0.5 rounded text-slate-300">NDA Protected</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Certificate of Incorporation (COI), MOA/AOA, GST Certificate, and audited balance sheets are restricted until you submit an NDA request.
              </p>

              <button
                onClick={() => setIsVaultModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Open Secure Document Room & NDA Vault</span>
              </button>
            </div>

            {/* CTA Footer */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>

              <button
                onClick={() => setIsMatchDrawerOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
              >
                <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200" />
                <span>⚡ View Matching Buyers</span>
              </button>

              <button
                onClick={() => setIsTermSheetModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Generate M&A Term Sheet / LOI</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onEnquire(company);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-md shadow-emerald-600/20"
              >
                <span>Send Acquisition Enquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Secure Document Vault Modal */}
      <SecureDocumentRoomModal
        company={company}
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
      />

      {/* Term Sheet / LOI Generator Modal */}
      <TermSheetGeneratorModal
        company={company}
        isOpen={isTermSheetModalOpen}
        onClose={() => setIsTermSheetModalOpen(false)}
      />

      {/* 2-Way AI Matching Drawer */}
      <SmartMatchDrawer
        item={company}
        type="COMPANY"
        isOpen={isMatchDrawerOpen}
        onClose={() => setIsMatchDrawerOpen(false)}
      />
    </>
  );
};
