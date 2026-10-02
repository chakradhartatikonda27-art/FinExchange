'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from '../../components/JobCard';
import { JobDetailsModal } from '../../components/JobDetailsModal';
import { JobListing } from '../../types';
import { Search, Briefcase } from 'lucide-react';

export default function JobsPage() {
  const { jobs } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [qualFilter, setQualFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'JOB' | 'INTERNSHIP'>('ALL');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLoc = locationFilter === 'ALL' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesQual = qualFilter === 'ALL' || job.qualification.some(q => q.toLowerCase().includes(qualFilter.toLowerCase()));
    const matchesCat = categoryFilter === 'ALL' || job.category === categoryFilter;

    return matchesSearch && matchesLoc && matchesQual && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 pt-2">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job Marketplace</h1>
          <p className="text-xs text-slate-500">Find CA, CS, CMA & Finance roles and articleships</p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          {filteredJobs.length} Jobs Available
        </span>
      </div>

      {/* Clean Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job title or company..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-base sm:text-xs font-medium"
            />
          </div>

          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-base sm:text-xs font-semibold bg-white"
            >
              <option value="ALL">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
            </select>
          </div>

          <div>
            <select
              value={qualFilter}
              onChange={(e) => setQualFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-base sm:text-xs font-semibold bg-white"
            >
              <option value="ALL">All Qualifications</option>
              <option value="CA">Chartered Accountant (CA)</option>
              <option value="CMA">Cost Accountant (CMA)</option>
              <option value="CS">Company Secretary (CS)</option>
              <option value="Fresher">Fresher</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar touch-pan-x pb-0.5">
          <span className="text-xs font-bold text-slate-500 shrink-0">Job Type:</span>
          {(['ALL', 'JOB', 'INTERNSHIP'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 touch-manipulation ${
                categoryFilter === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Opportunities' : cat === 'INTERNSHIP' ? 'Articleship & Internships' : 'Full-Time Jobs'}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={setSelectedJob}
              onApply={setSelectedJob}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-2">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No jobs found matching your criteria</h3>
        </div>
      )}

      {/* Modal */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

    </div>
  );
}
