'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { Home, Briefcase, Building2, MessageSquare, UserCheck, Plus, LayoutDashboard } from 'lucide-react';

interface BottomNavProps {
  onOpenCreateModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenCreateModal }) => {
  const pathname = usePathname();
  const { activeWorkspace } = useApp();

  // Dynamic primary navigation item based on workspace intent
  const getSecondItem = () => {
    switch (activeWorkspace) {
      case 'RECRUITER':
        return { href: '/jobs', icon: Briefcase, label: 'Manage Jobs' };
      case 'COMPANY_BUYER':
      case 'COMPANY_SELLER':
        return { href: '/companies', icon: Building2, label: 'Companies' };
      case 'PROFESSIONAL':
        return { href: '/directory', icon: UserCheck, label: 'Profiles' };
      case 'CANDIDATE':
      default:
        return { href: '/jobs', icon: Briefcase, label: 'Jobs' };
    }
  };

  const secondItem = getSecondItem();
  const SecondIcon = secondItem.icon;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-2 pt-1 pb-safe pb-2">
      <div className="flex items-center justify-around h-14 relative">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[48px] touch-manipulation text-[10px] ${
            pathname === '/' ? 'text-emerald-600 font-extrabold' : 'text-slate-500 font-medium'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Dynamic Context Link */}
        <Link
          href={secondItem.href}
          className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[48px] touch-manipulation text-[10px] ${
            pathname?.startsWith(secondItem.href) ? 'text-emerald-600 font-extrabold' : 'text-slate-500 font-medium'
          }`}
        >
          <SecondIcon className="w-5 h-5 mb-0.5" />
          <span>{secondItem.label}</span>
        </Link>

        {/* Central Prominent Floating + Button */}
        <button
          onClick={onOpenCreateModal}
          className="w-13 h-13 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shadow-xl transform -translate-y-4 border-4 border-white active:scale-95 transition-transform touch-manipulation"
          aria-label="Create Listing"
        >
          <Plus className="w-6 h-6 stroke-[3px]" />
        </button>

        {/* Directory / Professionals */}
        <Link
          href="/directory"
          className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[48px] touch-manipulation text-[10px] ${
            pathname?.startsWith('/directory') ? 'text-emerald-600 font-extrabold' : 'text-slate-500 font-medium'
          }`}
        >
          <UserCheck className="w-5 h-5 mb-0.5" />
          <span>Talent</span>
        </Link>

        {/* Workspace Dashboard */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[48px] touch-manipulation text-[10px] ${
            pathname?.startsWith('/dashboard') ? 'text-emerald-600 font-extrabold' : 'text-slate-500 font-medium'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Workspace</span>
        </Link>

      </div>
    </div>
  );
};
