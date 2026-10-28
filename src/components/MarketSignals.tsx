'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { TrendingUp, ShieldCheck, MapPin, BarChart3, Building2, Briefcase, UserCheck } from 'lucide-react';

export const MarketSignals: React.FC = () => {
  const { marketSignals } = useApp();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'HIRING':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'ACQUISITION':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'SERVICES':
        return <UserCheck className="w-4 h-4 text-amber-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-slate-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'HIRING':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ACQUISITION':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'SERVICES':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-4 rounded-xl text-white">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Privacy-Safe Market Signals & Trends</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Aggregated intelligence on hiring velocity, company deal demand, and professional service retainers.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3 py-1.5 rounded-lg shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Anonymized Intelligence</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketSignals.map(signal => (
          <div
            key={signal.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getCategoryBadge(signal.category)}`}>
                  {getCategoryIcon(signal.category)}
                  <span>{signal.category}</span>
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                  <MapPin className="w-3 h-3" />
                  <span>{signal.region}</span>
                </span>
              </div>

              <h3 className="font-semibold text-slate-900 text-sm mt-1">{signal.title}</h3>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Metric 1</span>
                <span className="font-medium text-slate-800">{signal.metric1}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Metric 2</span>
                <span className="font-medium text-slate-800">{signal.metric2}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Trend Signal</span>
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {signal.metric3}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
