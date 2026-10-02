'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { WorkspaceRole } from '../types';
import { 
  Home, 
  Briefcase, 
  Building2, 
  Users, 
  LayoutDashboard, 
  Sparkles, 
  ChevronDown, 
  UserCheck, 
  Building, 
  Search, 
  PlusCircle, 
  ShieldCheck,
  Check,
  Shield
} from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
}

const WORKSPACE_CONFIG: Record<WorkspaceRole, {
  label: string;
  badge: string;
  color: string;
  icon: React.ElementType;
  ctaText: string;
}> = {
  CANDIDATE: {
    label: 'Job Seeker',
    badge: 'Candidate',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    icon: Briefcase,
    ctaText: '+ Find / Save Jobs'
  },
  RECRUITER: {
    label: 'Recruiter / Employer',
    badge: 'Hiring',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: PlusCircle,
    ctaText: '+ Post a Job'
  },
  PROFESSIONAL: {
    label: 'Professional Profile',
    badge: 'CA/CS/CMA',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: UserCheck,
    ctaText: '✏️ Edit Mini-CV'
  },
  COMPANY_BUYER: {
    label: 'Company Buyer',
    badge: 'Acquisition',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    icon: Search,
    ctaText: '🔎 Buy Requirement'
  },
  COMPANY_SELLER: {
    label: 'Company Seller',
    badge: 'Seller',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    icon: Building,
    ctaText: '🏢 Sell Company'
  }
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenCreateModal }) => {
  const pathname = usePathname();
  const { currentUser, activeWorkspace, switchWorkspace, switchSubscriptionTier } = useApp();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentConfig = WORKSPACE_CONFIG[activeWorkspace] || WORKSPACE_CONFIG.CANDIDATE;
  const ActiveIcon = currentConfig.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Brand Logo & Workspace Switcher */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center font-extrabold text-white text-base shadow-xs">
                FE
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-extrabold tracking-tight text-slate-900">FinExchange</span>
                <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  CA • CS • CMA • Acquisition
                </span>
              </div>
            </Link>

            {/* Role / Workspace Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-all shadow-2xs touch-manipulation"
                title="Switch Workspace Intent"
              >
                <ActiveIcon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span className="hidden sm:inline">{currentConfig.label}</span>
                <span className="sm:hidden text-[11px] font-extrabold">{currentConfig.badge}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 shrink-0" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Workspace Intent
                  </div>

                  {(Object.keys(WORKSPACE_CONFIG) as WorkspaceRole[]).map((roleKey) => {
                    const cfg = WORKSPACE_CONFIG[roleKey];
                    const Icon = cfg.icon;
                    const isSelected = activeWorkspace === roleKey;

                    return (
                      <button
                        key={roleKey}
                        onClick={() => {
                          switchWorkspace(roleKey);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          isSelected ? 'bg-slate-50 font-bold' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className={`p-1.5 rounded-lg ${cfg.color} border`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs text-slate-900 font-semibold">{cfg.label}</span>
                            <span className="block text-[10px] text-slate-500">View & action for {cfg.badge}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Clean Top Navigation Bar tailored to active role */}
          <nav className="hidden lg:flex items-center space-x-5 text-xs font-semibold">
            <Link
              href="/"
              className={`flex items-center space-x-1 transition-colors ${
                pathname === '/' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/jobs"
              className={`flex items-center space-x-1 transition-colors ${
                pathname?.startsWith('/jobs') ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </Link>

            <Link
              href="/companies"
              className={`flex items-center space-x-1 transition-colors ${
                pathname?.startsWith('/companies') ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Companies</span>
            </Link>

            <Link
              href="/directory"
              className={`flex items-center space-x-1 transition-colors ${
                pathname?.startsWith('/directory') ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Professionals</span>
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center space-x-1 transition-colors ${
                pathname?.startsWith('/dashboard') ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </nav>

          {/* Primary Action & Monetization Tier Switcher */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const nextTier = currentUser.subscriptionTier === 'FREE' ? 'PRO_BUYER' : 'FREE';
                switchSubscriptionTier(nextTier);
              }}
              className={`hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-extrabold transition-all ${
                currentUser.subscriptionTier === 'FREE' 
                  ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' 
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
              }`}
              title="Toggle Monetization Entitlement Tier for Testing"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentUser.subscriptionTier === 'FREE' ? 'FREE (Masked)' : 'PRO (Entitled)'}</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all shrink-0 touch-manipulation"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse shrink-0" />
              <span className="hidden sm:inline">{currentConfig.ctaText}</span>
              <span className="sm:hidden">+ Post</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
