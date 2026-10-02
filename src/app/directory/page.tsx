'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfessionalCard } from '../../components/ProfessionalCard';
import { MiniCvModal } from '../../components/MiniCvModal';
import { ProfessionalProfile } from '../../types';
import { Search, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DirectoryPage() {
  const { professionals } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [qualFilter, setQualFilter] = useState<string>('ALL');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfessionalProfile | null>(null);
  const [inviteSentName, setInviteSentName] = useState<string | null>(null);

  const intentRoles = ['ALL', 'CA', 'CMA', 'CS', 'Auditor', 'Accountant', 'Tax Expert', 'CFO'];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = 
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesQual = qualFilter === 'ALL' || prof.primaryQualification === qualFilter || prof.title.toLowerCase().includes(qualFilter.toLowerCase());
    const matchesAvailable = !onlyAvailable || prof.isAvailableForHire;

    return matchesSearch && matchesQual && matchesAvailable;
  });

  const handleInvite = (p: ProfessionalProfile) => {
    setInviteSentName(p.name);
    setTimeout(() => {
      setInviteSentName(null);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 pt-2">
      
      {inviteSentName && (
        <div className="bg-emerald-600 text-white p-3.5 rounded-2xl shadow-lg flex items-center justify-between text-xs font-extrabold animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Job Invitation Sent to {inviteSentName} via Platform Intermediary Inbox</span>
          </div>
          <button onClick={() => setInviteSentName(null)} className="text-white/80 hover:text-white font-bold">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Professional Network Directory</h1>
          <p className="text-xs text-slate-500">Identity & credential verified Chartered Accountants, CMAs, CSs & CFOs</p>
        </div>

        <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {filteredProfessionals.length} Verified Profiles
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, expertise or skill (e.g. Statutory Audit, Direct Tax)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-base sm:text-xs font-medium"
            />
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <input
              type="checkbox"
              id="avail"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="avail" className="text-xs font-bold text-slate-700 cursor-pointer">
              Available for Opportunities Only
            </label>
          </div>
        </div>

        {/* Intent Search Pills */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar touch-pan-x pb-0.5">
          <span className="text-xs font-bold text-slate-500 shrink-0">I'm looking for:</span>
          {intentRoles.map(role => (
            <button
              key={role}
              onClick={() => setQualFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 touch-manipulation ${
                qualFilter === role ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {role === 'ALL' ? 'All Roles' : role}
            </button>
          ))}
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfessionals.map(profile => (
          <ProfessionalCard
            key={profile.id}
            profile={profile}
            onContact={(p) => setSelectedProfile(p)}
          />
        ))}
      </div>

      {/* Mini CV Profile Drawer Modal */}
      <MiniCvModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onInviteToJob={handleInvite}
      />

    </div>
  );
}
