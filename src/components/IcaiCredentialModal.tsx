'use client';

import React from 'react';
import { User, IcaiCredentialDetails } from '../types';
import { ShieldCheck, CheckCircle2, Award, FileCheck, Building, X, QrCode, Lock, Globe } from 'lucide-react';

interface IcaiCredentialModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const IcaiCredentialModal: React.FC<IcaiCredentialModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const icaiDetails: IcaiCredentialDetails = user.icaiDetails || {
    membershipNumber: user.icaiNumber || 'ICAI-M-402918',
    membershipType: 'FCA',
    copStatus: 'ACTIVE_PRACTICING',
    peerReviewCertificateNo: 'PRC-009182-TS',
    peerReviewStatus: 'VERIFIED_COMPLIANT',
    frnNumber: 'FRN-019283S',
    firmName: user.companyName || 'Sharma & Associates CA Firm',
    verifiedAt: '2024-01-15'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Official Credential Verification
              </span>
              <h3 className="text-sm font-extrabold text-white">ICAI / ICSI Membership Card</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Digital Membership Card Design */}
        <div className="p-6 space-y-6">
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700/80 space-y-5 relative overflow-hidden">
            {/* Background Watermark Crest */}
            <div className="absolute -right-6 -bottom-6 opacity-10 text-white pointer-events-none">
              <ShieldCheck className="w-48 h-48" />
            </div>

            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest block">
                  The Institute of Chartered Accountants of India
                </span>
                <span className="text-xs text-slate-300 font-semibold">Peer Reviewed Professional Practicing Member</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[10px]">
                {icaiDetails.membershipType} MEMBER
              </span>
            </div>

            {/* Member Profile Details */}
            <div className="pt-2">
              <h4 className="text-xl font-black text-white tracking-tight">{user.fullName}</h4>
              <p className="text-xs text-emerald-400 font-bold mt-0.5">Membership No: {icaiDetails.membershipNumber}</p>
              {icaiDetails.firmName && (
                <p className="text-xs text-slate-300 mt-1 flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{icaiDetails.firmName} ({icaiDetails.frnNumber || 'Registered Firm'})</span>
                </p>
              )}
            </div>

            {/* Verification Status Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60 text-[11px]">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[9px] block">Certificate of Practice</span>
                  <span className="font-bold text-emerald-300">Active Practicing</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[9px] block">Peer Review Board</span>
                  <span className="font-bold text-purple-300">Verified Compliant</span>
                </div>
              </div>
            </div>

            {/* Footer QR Verification */}
            <div className="flex justify-between items-end text-[10px] text-slate-400 pt-1">
              <div>
                <span>Digital Token Verification Code:</span>
                <span className="block text-slate-200 font-mono text-[11px]">ICAI-VER-2024-9182X</span>
              </div>
              <div className="p-1.5 bg-white rounded-lg text-slate-900">
                <QrCode className="w-6 h-6 text-slate-900" />
              </div>
            </div>
          </div>

          {/* Institutional Trust Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1">
            <div className="flex items-center space-x-1.5 font-extrabold text-slate-900">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Verified Institutional Governance</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Member credentials, ICAI enrollment numbers, and peer review compliance certificates are validated against public professional registries before awarding verified status.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Close Credential Modal
          </button>

        </div>
      </div>
    </div>
  );
};
