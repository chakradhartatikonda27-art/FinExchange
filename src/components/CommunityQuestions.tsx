'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityQuestion } from '../types';
import { HelpCircle, MessageSquare, ThumbsUp, Plus, Send, CheckCircle2, Sparkles, X } from 'lucide-react';

export const CommunityQuestions: React.FC = () => {
  const { communityQuestions, addCommunityQuestion, addCommunityAnswer } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  // Form States
  const [qTitle, setQTitle] = useState('');
  const [qCategory, setQCategory] = useState<CommunityQuestion['category']>('GST');
  const [qContent, setQContent] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const categories: ('ALL' | CommunityQuestion['category'])[] = [
    'ALL',
    'GST',
    'Income Tax',
    'Audit',
    'Accounting',
    'Finance',
    'ROC & Companies Act',
    'Career',
    'HR & Hiring'
  ];

  const filteredQuestions = communityQuestions.filter(q => 
    selectedCategory === 'ALL' || q.category === selectedCategory
  );

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTitle.trim() || !qContent.trim()) return;

    addCommunityQuestion(qTitle, qCategory, qContent);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsQuestionModalOpen(false);
      setQTitle('');
      setQContent('');
    }, 1500);
  };

  const handleSubmitAnswer = (questionId: string) => {
    if (!answerText.trim()) return;
    addCommunityAnswer(questionId, answerText);
    setAnswerText('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded">
              Network Knowledge Exchange
            </span>
            <span className="text-xs text-slate-500 font-semibold">Technical Q&A</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">Ask the Network</h2>
        </div>

        <button
          onClick={() => setIsQuestionModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all touch-manipulation"
        >
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>Ask Professional Question</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl text-xs font-bold overflow-x-auto no-scrollbar touch-pan-x">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat === 'ALL' ? 'All Topics' : cat}
          </button>
        ))}
      </div>

      {/* Question Threads List */}
      <div className="space-y-4">
        {filteredQuestions.map(q => {
          const isExpanded = activeQuestionId === q.id;

          return (
            <div 
              key={q.id}
              className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-slate-300 space-y-3 transition-colors text-xs"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                    {q.category}
                  </span>
                  <span className="text-slate-500 text-[11px]">Asked by <strong>{q.authorName}</strong> ({q.authorRole}) • {q.createdAt}</span>
                </div>

                <span className="text-slate-500 text-[11px] font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  💬 {q.answersCount} Answers
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{q.title}</h3>
                <p className="text-slate-700 leading-relaxed mt-1">{q.content}</p>
              </div>

              {/* Answers Accordion */}
              {isExpanded && (
                <div className="pt-3 border-t border-slate-200 space-y-3 animate-in fade-in duration-150">
                  <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Verified Answers</h4>
                  
                  {q.answers.length === 0 ? (
                    <p className="text-slate-500 italic text-[11px]">No answers yet. Be the first professional to respond!</p>
                  ) : (
                    q.answers.map(ans => (
                      <div key={ans.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-900">{ans.authorName} <span className="text-slate-500 font-normal">({ans.authorRole})</span></span>
                          <span className="text-emerald-700 font-bold flex items-center space-x-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <ThumbsUp className="w-3 h-3 text-emerald-600" />
                            <span>{ans.upvotes} Upvotes</span>
                          </span>
                        </div>
                        <p className="text-slate-800 text-xs leading-relaxed">{ans.content}</p>
                      </div>
                    ))
                  )}

                  {/* Add Answer Form */}
                  <div className="pt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Write your professional response..."
                      className="flex-1 p-2.5 rounded-xl border border-slate-300 text-base sm:text-xs font-medium"
                    />
                    <button
                      onClick={() => handleSubmitAnswer(q.id)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Respond</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => setActiveQuestionId(isExpanded ? null : q.id)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  {isExpanded ? 'Hide Thread ↑' : `View ${q.answersCount} Answers & Respond ↓`}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Ask Question Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden my-6">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Ask the Professional Network</h3>
              </div>
              <button onClick={() => setIsQuestionModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="p-6 space-y-4 text-xs">
              {isSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl flex items-center space-x-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Question Posted to Network Thread!</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-900 mb-1">Topic Category</label>
                <select
                  value={qCategory}
                  onChange={(e) => setQCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                >
                  <option value="GST">GST & Indirect Tax</option>
                  <option value="Income Tax">Income Tax & Litigation</option>
                  <option value="Audit">Statutory & Internal Audit</option>
                  <option value="Accounting">Accounting & Financial Reporting</option>
                  <option value="Finance">FP&A & Corporate Finance</option>
                  <option value="ROC & Companies Act">ROC & Companies Act Compliance</option>
                  <option value="Career">Career & Articleship Guidance</option>
                  <option value="HR & Hiring">HR & Professional Hiring</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Question Summary / Title</label>
                <input
                  type="text"
                  value={qTitle}
                  onChange={(e) => setQTitle(e.target.value)}
                  placeholder="e.g. Rule 42 ITC Reversal on Common Inputs for Exempted Supplies..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Detailed Scenario / Background</label>
                <textarea
                  value={qContent}
                  onChange={(e) => setQContent(e.target.value)}
                  rows={3}
                  placeholder="Provide relevant facts, section numbers, or compliance scenario..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-base sm:text-xs"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center space-x-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Question</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
