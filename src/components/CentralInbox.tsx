'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Building2, Briefcase, Send } from 'lucide-react';

export const CentralInbox: React.FC = () => {
  const { enquiries, applications, approveNdaAccess } = useApp();
  const [activeTab, setActiveTab] = useState<'ENQUIRIES' | 'APPLICATIONS'>('ENQUIRIES');
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string>(enquiries[0]?.id || '');
  const [replyMessage, setReplyMessage] = useState('');
  const [threadMessages, setThreadMessages] = useState<Record<string, { sender: string; text: string; time: string }[]>>({});
  const [unlockedNdaIds, setUnlockedNdaIds] = useState<string[]>([]);

  const selectedEnquiry = enquiries.find(e => e.id === selectedEnquiryId) || enquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedEnquiry) return;

    const newMsg = { sender: 'You (Seller / Platform)', text: replyMessage, time: 'Just now' };
    setThreadMessages(prev => ({
      ...prev,
      [selectedEnquiry.id]: [...(prev[selectedEnquiry.id] || []), newMsg]
    }));
    setReplyMessage('');
  };

  const handleUnlockNda = (companyId: string) => {
    approveNdaAccess(companyId);
    setUnlockedNdaIds(prev => [...prev, companyId]);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[480px]">
      
      {/* Left Sidebar Thread List */}
      <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50 p-4 space-y-4">
        
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">Communication Inbox</h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('ENQUIRIES')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${activeTab === 'ENQUIRIES' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Company Bids ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('APPLICATIONS')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${activeTab === 'APPLICATIONS' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Applications ({applications.length})
          </button>
        </div>

        {/* List of Conversations */}
        <div className="space-y-2">
          {activeTab === 'ENQUIRIES' ? (
            enquiries.map(enq => (
              <div
                key={enq.id}
                onClick={() => setSelectedEnquiryId(enq.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all text-xs ${
                  selectedEnquiryId === enq.id ? 'bg-emerald-50 border-emerald-300 shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Building2 className="w-3 h-3 text-emerald-600" />
                  <span className="truncate">Regarding: {enq.companyTitle}</span>
                </div>
                <p className="font-bold text-slate-900 line-clamp-1">{enq.buyerName}</p>
                <p className="text-slate-500 line-clamp-1">{enq.message}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{enq.submittedAt}</span>
              </div>
            ))
          ) : (
            applications.map(app => (
              <div
                key={app.id}
                className="p-3 rounded-2xl bg-white border border-slate-200 text-xs space-y-1"
              >
                <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <Briefcase className="w-3 h-3 text-emerald-600" />
                  <span className="truncate">Regarding: {app.jobTitle}</span>
                </div>
                <p className="font-bold text-slate-900">{app.applicantName}</p>
                <p className="text-slate-500">{app.companyName}</p>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Main Conversation Window */}
      <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
        
        {selectedEnquiry ? (
          <>
            <div className="space-y-4">
              {/* Context Banner */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-start text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Acquisition Enquiry Thread
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{selectedEnquiry.companyTitle}</h4>
                  <p className="text-slate-500 mt-0.5">From: {selectedEnquiry.buyerName} ({selectedEnquiry.buyerEmail} • {selectedEnquiry.buyerPhone})</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-700 block">{selectedEnquiry.proposedPrice}</span>
                  {unlockedNdaIds.includes(selectedEnquiry.companyId) || selectedEnquiry.status === 'DOCUMENT_ACCESS_GRANTED' ? (
                    <span className="mt-1 inline-block px-3 py-1 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      ✓ NDA Vault Unlocked
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUnlockNda(selectedEnquiry.companyId)}
                      className="mt-1 px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px]"
                    >
                      Unlock NDA Vault
                    </button>
                  )}
                </div>
              </div>

              {/* Message Bubbles */}
              <div className="space-y-3 max-h-[240px] overflow-y-auto">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl max-w-xl text-xs space-y-1">
                  <p className="font-bold text-slate-900">{selectedEnquiry.buyerName}</p>
                  <p className="text-slate-800 leading-relaxed">{selectedEnquiry.message}</p>
                  <span className="text-[10px] text-slate-400 block pt-1">{selectedEnquiry.submittedAt}</span>
                </div>

                {(threadMessages[selectedEnquiry.id] || []).map((msg, idx) => (
                  <div key={idx} className="bg-slate-900 text-white p-4 rounded-2xl max-w-xl text-xs space-y-1 ml-auto">
                    <p className="font-bold text-emerald-400">{msg.sender}</p>
                    <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendReply} className="flex items-center space-x-2 pt-4 border-t border-slate-200">
              <input
                type="text"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type contextual message reply..."
                className="flex-1 p-3 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-20 text-slate-400 text-xs font-medium">Select a conversation thread to view messages</div>
        )}

      </div>

    </div>
  );
};
