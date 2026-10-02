'use client';

import React from 'react';
import { ProfessionalProfile } from '../types';
import { ShieldCheck, MapPin, Award, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

interface ProfessionalCardProps {
  profile: ProfessionalProfile;
  onContact: (profile: ProfessionalProfile) => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ profile, onContact }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy-300 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
      <div>
        
        {/* Header Avatar & Qualification Tag */}
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 rounded-full bg-navy-800 text-white font-bold flex items-center justify-center text-base flex-shrink-0 shadow-md">
            {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-bold text-navy-900 truncate">{profile.name}</h3>
              {profile.isVerified && (
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
            </div>

            <p className="text-xs font-semibold text-brand-700 truncate">{profile.title}</p>
            <span className="inline-block text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded mt-1">
              {profile.membershipNumber || profile.primaryQualification}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            <span>{profile.totalExperienceYears} Yrs Exp</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{profile.location}</span>
          </div>
        </div>

        {/* Bio summary */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Skill Chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {profile.skills.slice(0, 3).map(skill => (
            <span key={skill} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {skill}
            </span>
          ))}
          {profile.skills.length > 3 && (
            <span className="text-[10px] text-slate-400">+{profile.skills.length - 3} more</span>
          )}
        </div>

      </div>

      {/* Contact Trigger */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-700">
          {profile.expectedSalaryDisplay || 'Available for Hiring / Retainership'}
        </span>

        <button
          onClick={() => onContact(profile)}
          className="py-1.5 px-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center space-x-1 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact</span>
        </button>
      </div>
    </div>
  );
};
