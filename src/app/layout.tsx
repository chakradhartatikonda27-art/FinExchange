'use client';

import React, { useState } from 'react';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { BottomNav } from '../components/BottomNav';
import { QuickPostModal } from '../components/QuickPostModal';
import { CreateListingModal } from '../components/CreateListingModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isQuickPostOpen, setIsQuickPostOpen] = useState(false);

  const handleSelectCreateOption = (option: 'JOB' | 'SELL_COMPANY' | 'BUY_COMPANY' | 'PROFESSIONAL_SERVICE' | 'WHATSAPP_AI') => {
    if (option === 'WHATSAPP_AI') {
      setIsQuickPostOpen(true);
    } else if (option === 'JOB') {
      window.location.href = '/jobs?action=post';
    } else if (option === 'SELL_COMPANY') {
      window.location.href = '/companies?action=sell';
    } else if (option === 'BUY_COMPANY') {
      window.location.href = '/companies?action=buy';
    } else {
      window.location.href = '/directory?action=register';
    }
  };

  return (
    <html lang="en">
      <head>
        <title>FinExchange - CA, CS, CMA & Business Acquisition Engine</title>
        <meta name="description" content="Professional network marketplace for CAs, CMAs, CSs, finance jobs, and company acquisitions." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-slate-50 min-h-screen flex flex-col pb-16 md:pb-0">
        <AppProvider>
          <Navbar onOpenCreateModal={() => setIsCreateModalOpen(true)} />
          
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>

          <BottomNav onOpenCreateModal={() => setIsCreateModalOpen(true)} />
          
          <CreateListingModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSelectOption={handleSelectCreateOption}
          />

          <QuickPostModal
            isOpen={isQuickPostOpen}
            onClose={() => setIsQuickPostOpen(false)}
          />
        </AppProvider>
      </body>
    </html>
  );
}
