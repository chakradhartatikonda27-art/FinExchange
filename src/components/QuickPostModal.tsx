'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { parseRawWhatsappPost } from '../lib/aiParser';
import { AiParsedPayload, ListingCategory } from '../types';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, X, Edit3, ShieldAlert, Check } from 'lucide-react';

interface QuickPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickPostModal: React.FC<QuickPostModalProps> = ({ isOpen, onClose }) => {
  const { addJob, addCompany } = useApp();
  
  const [rawText, setRawText] = useState(`Internship in solenis gss india pvt ltd.
Domain: FP and A cost department.
Requirement: qualified CMA and fresher.
Salary: 30k to 35k.
Interested candidates DM cv.`);

  const [parsedPayload, setParsedPayload] = useState<AiParsedPayload | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPublishedSuccess, setIsPublishedSuccess] = useState(false);

  // Form State
  const [category, setCategory] = useState<ListingCategory>('INTERNSHIP');
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [companyType, setCompanyType] = useState('Private Limited');
  const [incorporationYear, setIncorporationYear] = useState('2019');

  if (!isOpen) return null;

  const handleParseText = () => {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const result = parseRawWhatsappPost(rawText);
      setParsedPayload(result);
      setCategory(result.category);

      const ef = result.extractedFields;
      setTitle(ef.title || 'Finance Professional');
      setCompanyName(ef.companyName || 'Solenis GSS India Pvt Ltd');
      setDepartment(ef.department || 'FP&A / Costing');
      setQualification(Array.isArray(ef.qualification) ? ef.qualification.join(', ') : 'CMA');
      setExperience(ef.experience || 'Fresher (0 years)');
      setSalary(ef.salary || '₹30,000 – ₹35,000');
      setLocation(ef.location || 'Location not specified');
      setAskingPrice(ef.askingPrice || 'Asking price not specified');
      if (ef.companyType) setCompanyType(ef.companyType);
      if (ef.incorporationYear) setIncorporationYear(ef.incorporationYear);

      setIsProcessing(false);
    }, 600);
  };

  const handlePublish = () => {
    if (category === 'JOB' || category === 'INTERNSHIP') {
      addJob({
        title,
        companyName,
        category: category === 'INTERNSHIP' ? 'INTERNSHIP' : 'JOB',
        department: department as any,
        salaryDisplay: salary,
        location,
        qualification: qualification.split(',').map(s => s.trim()) as any,
        description: rawText,
        rawWhatsappSource: rawText,
        isAiGenerated: true
      });
    } else if (category === 'COMPANY_FOR_SALE') {
      addCompany({
        listingTitle: title || `${companyType} Entity in ${location}`,
        askingPriceDisplay: askingPrice,
        companyType: companyType as any,
        registeredCity: location,
        incorporationYear: parseInt(incorporationYear) || 2021,
        description: rawText,
        rawWhatsappSource: rawText
      });
    }

    setIsPublishedSuccess(true);
    setTimeout(() => {
      setIsPublishedSuccess(false);
      setParsedPayload(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Convert WhatsApp Post to Structured Listing</h3>
              <p className="text-xs text-slate-300">Paste WhatsApp message ➔ AI extraction ➔ Review ➔ Publish</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {isPublishedSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Listing Verified & Published!</p>
                <p className="text-xs text-emerald-700">Converted raw WhatsApp post into live searchable marketplace listing.</p>
              </div>
            </div>
          )}

          {!parsedPayload ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                  <span>Paste WhatsApp Post Content</span>
                </label>

                <button
                  onClick={() => setRawText(`Internship in solenis gss india pvt ltd.
Domain: FP and A cost department.
Requirement: qualified CMA and fresher.
Salary: 30k to 35k.
Interested candidates DM cv.`)}
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  Load Solenis GSS Example
                </button>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={6}
                placeholder="Paste message here e.g.: Internship in Solenis GSS India Pvt Ltd... Domain FP&A... Salary 30k to 35k..."
                className="w-full p-4 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs font-mono bg-slate-50 text-slate-900"
              />

              <div className="flex items-center justify-between bg-slate-100 p-3.5 rounded-xl text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  <span>Human confirmation required before publishing.</span>
                </div>
                <button
                  onClick={handleParseText}
                  disabled={isProcessing || !rawText.trim()}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-md shadow-emerald-600/20"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Structuring Details...</span>
                    </>
                  ) : (
                    <>
                      <span>Structure with AI</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Human-Readable Field Check Status Matrix */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">AI Identification Breakdown</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase">
                    {parsedPayload.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {parsedPayload.fieldChecks.map((chk, idx) => (
                    <div key={idx} className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 ${
                      chk.isIdentified ? 'bg-white border-emerald-300 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      {chk.isIdentified ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      )}
                      <span className="truncate">{chk.isIdentified ? `${chk.fieldName} found` : `${chk.fieldName} not found`}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Listing Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ListingCategory)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  >
                    <option value="JOB">JOB</option>
                    <option value="INTERNSHIP">INTERNSHIP / ARTICLESHIP</option>
                    <option value="COMPANY_FOR_SALE">COMPANY FOR SALE</option>
                    <option value="COMPANY_WANTED">COMPANY WANTED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation / Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Entity Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department / Industry</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Qualification Required</label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Salary / Stipend</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                <button
                  onClick={() => setParsedPayload(null)}
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold flex items-center space-x-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Re-edit Raw Text</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePublish}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/30"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm & Publish Listing</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
