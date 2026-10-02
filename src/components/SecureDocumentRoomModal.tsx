'use client';

import React, { useState } from 'react';
import { CompanyListing, CompanyDocumentItem } from '../types';
import { useApp } from '../context/AppContext';
import { generateExpiringSignedUrl, hasEntitlement } from '../lib/accessControl';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  KeyRound,
  Eye,
  Building
} from 'lucide-react';

interface SecureDocumentRoomModalProps {
  company: CompanyListing;
  isOpen: boolean;
  onClose: () => void;
}

export const SecureDocumentRoomModal: React.FC<SecureDocumentRoomModalProps> = ({
  company,
  isOpen,
  onClose
}) => {
  const { currentUser, enquiries, requestNdaAccess } = useApp();
  const [agreedToNda, setAgreedToNda] = useState(false);
  const [activeSignedUrls, setActiveSignedUrls] = useState<Record<string, { url: string; expiresAtFormatted: string; auditLogNotice: string }>>({});

  if (!isOpen || !company) return null;

  const isSeller = currentUser.id === company.sellerId;

  // Check if current user has an approved enquiry with document access granted
  const userEnquiry = enquiries.find(e => e.companyId === company.id && e.buyerId === currentUser.id);
  const isApprovedBySeller = isSeller || userEnquiry?.status === 'DOCUMENT_ACCESS_GRANTED' || company.ndaStatus === 'APPROVED';
  const canAccessVaultDirectly = isApprovedBySeller || hasEntitlement(currentUser, 'ACCESS_SECURE_DOCUMENT_VAULT');

  const documents: CompanyDocumentItem[] = company.documents || [
    {
      id: 'doc-default-01',
      title: 'ROC Certificate of Incorporation (Form 1)',
      type: 'INC_CERT',
      fileName: 'ROC_INC_Registration_Doc.pdf',
      fileSize: '1.5 MB',
      uploadedAt: company.postedAt,
      isConfidential: true,
      ndaRequired: true
    },
    {
      id: 'doc-default-02',
      title: 'GST REG-06 Certificate & Filing Record',
      type: 'GST_CERT',
      fileName: 'GSTIN_Registration_Verified.pdf',
      fileSize: '920 KB',
      uploadedAt: company.postedAt,
      isConfidential: true,
      ndaRequired: true
    }
  ];

  const handleGenerateLink = (doc: CompanyDocumentItem) => {
    const signedData = generateExpiringSignedUrl(doc.id, currentUser.id, company.listingTitle);
    setActiveSignedUrls(prev => ({
      ...prev,
      [doc.id]: signedData
    }));
  };

  const handleRequestNda = () => {
    if (!agreedToNda) return;
    requestNdaAccess(company.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                  Confidential Data Vault
                </span>
                <span className="text-xs text-slate-400 font-medium">15-Min Expiring Links</span>
              </div>
              <h2 className="text-lg font-extrabold text-white mt-1 leading-tight">
                {company.listingTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Banner */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Watermarked & Time-Stamped Access Logging Enabled</span>
          </div>
          <span className="text-slate-400 text-[10px] font-mono">ENCRYPTED 256-BIT</span>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Status Alert Banner */}
          {!canAccessVaultDirectly ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center space-x-2 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>NDA & Seller Approval Required for Document Unlocking</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                ROC Certificates of Incorporation, GST Return filings, and Audited Financial Statements contain private corporate data. To view documents, submit an NDA request below.
              </p>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs flex items-center space-x-3 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-extrabold block text-sm">Vault Access Authorized</span>
                <span className="text-emerald-700">
                  {isSeller ? 'You are the verified owner of this listing.' : 'Seller has approved your NDA request for confidential document review.'}
                </span>
              </div>
            </div>
          )}

          {/* Document List */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Protected Document Inventory ({documents.length})
            </h3>

            {documents.map((doc) => {
              const signedInfo = activeSignedUrls[doc.id];

              return (
                <div 
                  key={doc.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {doc.fileName} • {doc.fileSize} • Uploaded {doc.uploadedAt}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase">
                      {doc.type}
                    </span>
                  </div>

                  {/* Action or Masked Lock */}
                  {canAccessVaultDirectly ? (
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      {!signedInfo ? (
                        <button
                          onClick={() => handleGenerateLink(doc)}
                          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs"
                        >
                          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                          <span>Generate 15-Min Expiring Signed Access URL</span>
                        </button>
                      ) : (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-emerald-900 flex items-center space-x-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Expiring Signed Link Active</span>
                            </span>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full">
                              Expires in 15 Min
                            </span>
                          </div>
                          <a
                            href={signedInfo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 font-bold text-emerald-700 underline text-xs mt-1 hover:text-emerald-900"
                          >
                            <span>Open Watermarked Document Preview</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <p className="text-[10px] text-slate-500 italic mt-1">{signedInfo.auditLogNotice}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center space-x-2">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.maskedAccessNotice || '🔐 Confidential document URL masked by FinExchange Security Layer.'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* NDA Agreement Submission Form (if not approved) */}
          {!canAccessVaultDirectly && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-lg border border-slate-800">
              <div>
                <h4 className="text-xs font-extrabold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Submit Non-Disclosure Agreement (NDA) Request</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  By checking the agreement box below, your access request will be transmitted directly to the seller for approval.
                </p>
              </div>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToNda}
                  onChange={(e) => setAgreedToNda(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-800"
                />
                <span className="text-xs text-slate-200">
                  I agree to maintain strict confidentiality of all financial, ROC, and GST disclosures associated with <strong className="text-white">{company.listingTitle}</strong> and will not distribute materials outside FinExchange.
                </span>
              </label>

              <button
                onClick={handleRequestNda}
                disabled={!agreedToNda}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
                  agreedToNda
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Submit NDA & Request Vault Access</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
