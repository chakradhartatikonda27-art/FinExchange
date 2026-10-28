'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Hash, Check, Plus, Users, Sparkles } from 'lucide-react';

export const TopicChannels: React.FC = () => {
  const { topics, toggleFollowTopic } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gradient-to-r from-slate-900 to-indigo-950 p-4 rounded-xl text-white">
        <div>
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold">Professional Topic Channels</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Follow specialized channels to personalize your opportunity alerts and technical Q&A feeds.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-3 py-1.5 rounded-lg shrink-0">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{topics.filter(t => t.isFollowing).length} Subscribed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map(topic => (
          <div
            key={topic.id}
            className={`p-4 rounded-xl border transition-all ${
              topic.isFollowing
                ? 'bg-indigo-50/60 border-indigo-200 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-slate-100 text-slate-600 mb-1.5">
                  {topic.category}
                </span>
                <h3 className="font-semibold text-slate-900 text-base">{topic.name}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{topic.description}</p>
              </div>

              <button
                onClick={() => toggleFollowTopic(topic.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  topic.isFollowing
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {topic.isFollowing ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{topic.followersCount.toLocaleString('en-IN')} professionals following</span>
              </div>
              {topic.isFollowing && (
                <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Alerts active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
