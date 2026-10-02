'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { parseSmartQuery, POPULAR_SEARCH_TAGS } from '../lib/smartSearch';
import { Search, X, Sparkles, ArrowRight, Briefcase, Building2, Users } from 'lucide-react';

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartSearchModal: React.FC<SmartSearchModalProps> = ({ isOpen, onClose }) => {
  const [queryText, setQueryText] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'JOBS' | 'COMPANIES' | 'PROFESSIONALS'>('ALL');

  if (!isOpen) return null;

  const parsed = parseSmartQuery(queryText);

  const handleSelectPopularTag = (tag: string) => {
    setQueryText(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 backdrop-blur-sm p-4 pt-16 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
            <span className="text-sm font-bold text-slate-900">Smart Natural Language Search</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">What are you looking for?</label>
            <div className="bg-white rounded-2xl border-2 border-emerald-500 p-2 flex items-center space-x-3 shadow-md">
              <Search className="w-5 h-5 text-emerald-600 ml-2 flex-shrink-0" />
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                autoFocus
                placeholder="e.g. 'I need an IT company in Hyderabad registered before 2020 under 50 lakhs'..."
                className="w-full text-sm font-medium border-none focus:outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
              />
              {queryText && (
                <button onClick={() => setQueryText('')} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* AI Extracted Filter Pills */}
          {parsed.detectedTags.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-emerald-800 block">AI Detected Query Filters:</span>
              <div className="flex flex-wrap gap-1.5">
                {parsed.detectedTags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold bg-white text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-xs">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Popular Searches</span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelectPopularTag(tag)}
                  className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl transition-colors border border-slate-200"
                >
                  🔍 {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Scope Tabs */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeTab === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                All Scope
              </button>
              <button
                onClick={() => setActiveTab('JOBS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeTab === 'JOBS' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Jobs
              </button>
              <button
                onClick={() => setActiveTab('COMPANIES')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeTab === 'COMPANIES' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Companies
              </button>
              <button
                onClick={() => setActiveTab('PROFESSIONALS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeTab === 'PROFESSIONALS' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Professionals
              </button>
            </div>

            <Link
              href={
                parsed.category === 'COMPANIES' || activeTab === 'COMPANIES'
                  ? `/companies?q=${encodeURIComponent(queryText)}`
                  : parsed.category === 'PROFESSIONALS' || activeTab === 'PROFESSIONALS'
                  ? `/directory?q=${encodeURIComponent(queryText)}`
                  : `/jobs?q=${encodeURIComponent(queryText)}`
              }
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
            >
              <span>Execute Smart Search</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
