'use client';

import React, { useState } from 'react';
import { ProfessionalProfile } from '../types';
import { IcaiCredentialModal } from './IcaiCredentialModal';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Award, Briefcase, GraduationCap, X, Mail, Send, CheckCircle2, FileCheck } from 'lucide-react';

interface MiniCvModalProps {
  profile: ProfessionalProfile | null;
  onClose: () => void;
  onInviteToJob: (profile: ProfessionalProfile) => void;
}

export const MiniCvModal: React.FC<MiniCvModalProps> = ({ profile, onClose, onInviteToJob }) => {
  const { currentUser } = useApp();
  const [isIcaiModalOpen, setIsIcaiModalOpen] = useState(false);
  const [isContactSent, setIsContactSent] = useState(false);

  if (!profile) return null;

  const handleContact = () => {
    setIsContactSent(true);
    setTimeout(() => {
      setIsContactSent(false);
    }, 2500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
        <div className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xl flex-shrink-0 shadow-lg border-2 border-white">
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                  {profile.isVerified && (
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <p className="text-xs font-semibold text-emerald-400">{profile.title}</p>
                
                <div className="flex items-center space-x-2 pt-1">
                  <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded border border-slate-700">
                    {profile.membershipNumber || profile.primaryQualification}
                  </span>
                  <span className="text-xs text-slate-300 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Check Matrix */}
          <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-emerald-800">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Identity Verified</span>
            </div>

            <button
              onClick={() => setIsIcaiModalOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-extrabold text-[11px] shadow-xs hover:bg-emerald-800 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-emerald-200" />
              <span>View Verified ICAI Credential Card</span>
            </button>

            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Available for Hire</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
            
            {/* Bio */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">Professional Overview</h4>
              <p className="text-slate-700 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Expertise Chips */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Core Domain Expertise</h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map(skill => (
                  <span key={skill} className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience History */}
            {profile.experiences && profile.experiences.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>Career History</span>
                </h4>
                <div className="space-y-2">
                  {profile.experiences.map((exp, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-900">{exp.role}</p>
                        <p className="text-slate-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {exp.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1">
                  <GraduationCap className="w-4 h-4 text-slate-500" />
                  <span>Education & Qualifications</span>
                </h4>
                <div className="space-y-2">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-900">{edu.degree}</p>
                        <p className="text-slate-600 font-medium">{edu.institution}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Note */}
            <div className="bg-slate-100 p-3 rounded-xl text-slate-500 text-[11px]">
              🔒 Direct contact details remain protected until mutual connection or job invitation acceptance.
            </div>

            {/* Action CTAs */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
              <button
                onClick={handleContact}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-1 transition-all ${
                  isContactSent
                    ? 'bg-emerald-600 text-white border border-emerald-600'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isContactSent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✓ Request Sent</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact Candidate</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onInviteToJob(profile);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-md shadow-emerald-600/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Invite to Job / Retainership</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ICAI Digital Credential Modal */}
      <IcaiCredentialModal
        user={{
          ...currentUser,
          fullName: profile.name,
          icaiNumber: profile.membershipNumber || 'ICAI-M-402918'
        }}
        isOpen={isIcaiModalOpen}
        onClose={() => setIsIcaiModalOpen(false)}
      />
    </>
  );
};
