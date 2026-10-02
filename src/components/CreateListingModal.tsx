'use client';

import React from 'react';
import { Briefcase, Building2, TrendingUp, Users, Sparkles, X } from 'lucide-react';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: 'JOB' | 'SELL_COMPANY' | 'BUY_COMPANY' | 'PROFESSIONAL_SERVICE' | 'WHATSAPP_AI') => void;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, onSelectOption }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-base">+</span>
            <div>
              <h3 className="text-base font-bold text-white">Create Listing</h3>
              <p className="text-xs text-slate-300">Select what you want to post on FinExchange</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Clean Creation Options */}
        <div className="p-6 space-y-3">
          
          <button
            onClick={() => {
              onClose();
              onSelectOption('WHATSAPP_AI');
            }}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-brand-50 border-2 border-emerald-300 hover:border-emerald-500 transition-all text-left flex items-start space-x-3.5 group shadow-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md">
              <Sparkles className="w-5 h-5 text-emerald-200 animate-pulse" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block flex items-center space-x-1">
                <span>✨ Paste WhatsApp Post (Instant AI)</span>
                <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full">FASTEST</span>
              </span>
              <span className="text-xs text-slate-600">Paste raw text from WhatsApp & let AI structure details automatically</span>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectOption('JOB');
            }}
            className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition-all text-left flex items-center space-x-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">💼 Job / Articleship Opening</span>
              <span className="text-xs text-slate-500">Recruit CAs, CMAs, CSs or Finance Interns</span>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectOption('SELL_COMPANY');
            }}
            className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition-all text-left flex items-center space-x-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">🏢 Company for Sale</span>
              <span className="text-xs text-slate-500">List registered Pvt Ltd or LLP entity for acquisition</span>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectOption('BUY_COMPANY');
            }}
            className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition-all text-left flex items-center space-x-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">🔎 Company Acquisition Requirement</span>
              <span className="text-xs text-slate-500">Post target acquisition budget & location parameters</span>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectOption('PROFESSIONAL_SERVICE');
            }}
            className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition-all text-left flex items-center space-x-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">👤 Professional Service / Consultancy Profile</span>
              <span className="text-xs text-slate-500">Offer retainer audit, GST or Virtual CFO consulting</span>
            </div>
          </button>

        </div>

      </div>
    </div>
  );
};
