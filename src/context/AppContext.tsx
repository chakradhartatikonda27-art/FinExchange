'use client';

import React, { createContext, useContext, useState } from 'react';
import { User, UserRole, WorkspaceRole, SubscriptionTier, JobListing, CompanyListing, ProfessionalProfile, AcquisitionRequest, JobApplication, CompanyEnquiry, NotificationItem, SavedSearch, ApplicationStage } from '../types';
import { INITIAL_USER, SEED_JOBS, SEED_COMPANIES, SEED_BUY_REQUESTS, SEED_PROFESSIONALS } from '../lib/seedData';
import { sanitizeJobListing, sanitizeCompanyListing } from '../lib/accessControl';

interface AppContextType {
  currentUser: User;
  activeWorkspace: WorkspaceRole;
  switchRole: (role: UserRole) => void;
  switchWorkspace: (workspace: WorkspaceRole) => void;
  switchSubscriptionTier: (tier: SubscriptionTier) => void;
  jobs: JobListing[];
  companies: CompanyListing[];
  buyRequests: AcquisitionRequest[];
  professionals: ProfessionalProfile[];
  applications: JobApplication[];
  enquiries: CompanyEnquiry[];
  savedJobIds: string[];
  savedCompanyIds: string[];
  comparedCompanyIds: string[];
  savedSearches: SavedSearch[];
  notifications: NotificationItem[];
  addJob: (newJob: Partial<JobListing>) => JobListing;
  addCompany: (newCompany: Partial<CompanyListing>) => CompanyListing;
  addBuyRequest: (req: Partial<AcquisitionRequest>) => AcquisitionRequest;
  applyForJob: (jobId: string, coverNote?: string) => boolean;
  updateApplicationStage: (appId: string, stage: ApplicationStage) => void;
  submitCompanyEnquiry: (companyId: string, message: string, proposedPrice?: string) => boolean;
  requestNdaAccess: (companyId: string) => void;
  approveNdaAccess: (companyId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  toggleSaveCompany: (companyId: string) => void;
  toggleCompareCompany: (companyId: string) => void;
  clearComparedCompanies: () => void;
  createSavedSearch: (title: string, type: 'JOB' | 'COMPANY' | 'PROFESSIONAL', queryText: string) => void;
  verifyListing: (id: string, type: 'JOB' | 'COMPANY') => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceRole>('CANDIDATE');
  const [jobs, setJobs] = useState<JobListing[]>(SEED_JOBS);
  const [companies, setCompanies] = useState<CompanyListing[]>(SEED_COMPANIES);
  const [buyRequests, setBuyRequests] = useState<AcquisitionRequest[]>(SEED_BUY_REQUESTS);
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>(SEED_PROFESSIONALS);
  
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 'app-101',
      jobId: 'job-solenis-01',
      jobTitle: 'CMA Industrial Trainee / FP&A Internship',
      companyName: 'Solenis GSS India Pvt Ltd',
      applicantId: 'usr-999',
      applicantName: 'Karthik Raja (Qualified CMA)',
      applicantEmail: 'karthik.cma@gmail.com',
      applicantPhone: '+91 91234 56789',
      qualification: 'CMA',
      experienceYears: 0,
      coverNote: 'Qualified CMA intermediate passed with 92% in Financial Management.',
      appliedAt: '1 hour ago',
      stage: 'APPLIED',
      status: 'SUBMITTED'
    },
    {
      id: 'app-102',
      jobId: 'job-tax-mgr-02',
      jobTitle: 'Senior Tax Manager (Direct & Indirect Tax)',
      companyName: 'Kothari & Co CA Firm',
      applicantId: 'usr-888',
      applicantName: 'Sneha Reddy (ACA)',
      applicantEmail: 'sneha.reddy@gmail.com',
      applicantPhone: '+91 98765 12345',
      qualification: 'CA',
      experienceYears: 5,
      coverNote: '5 years experience handling ITAT appellate arguments and GST litigation.',
      appliedAt: 'Yesterday',
      stage: 'SHORTLISTED',
      status: 'SHORTLISTED'
    }
  ]);

  const [enquiries, setEnquiries] = useState<CompanyEnquiry[]>([
    {
      id: 'enq-201',
      companyId: 'comp-sale-01',
      companyTitle: '2019 Registered Private Limited IT Services Company',
      buyerId: 'usr-008',
      buyerName: 'Anand Varma (Angel Investor)',
      buyerEmail: 'anand.v@capitalpartner.in',
      buyerPhone: '+91 98765 43210',
      proposedPrice: '₹24.5 Lakhs',
      message: 'We are interested in acquiring this IT entity for immediate IT bidding. Please grant ROC document vault access.',
      submittedAt: 'Yesterday',
      status: 'PENDING'
    }
  ]);

  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-solenis-01']);
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>(['comp-sale-01']);
  const [comparedCompanyIds, setComparedCompanyIds] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: 'srch-01',
      title: 'IT Companies in Hyderabad under ₹50L',
      type: 'COMPANY',
      queryText: 'IT company in Hyderabad under 50 lakhs',
      alertEnabled: true,
      createdAt: '2 days ago'
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Listing Verified',
      message: 'Your job "CMA Industrial Trainee" has passed ROC/ICAI compliance review.',
      type: 'VERIFICATION',
      createdAt: '10 mins ago',
      isRead: false
    },
    {
      id: 'notif-2',
      title: 'New Acquisition Enquiry',
      message: 'Anand Varma requested NDA access for your 2019 IT Pvt Ltd listing.',
      type: 'ENQUIRY',
      createdAt: '1 hour ago',
      isRead: false
    }
  ]);

  const switchRole = (role: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      activeRole: role,
      roles: prev.roles.includes(role) ? prev.roles : [...prev.roles, role]
    }));
  };

  const switchWorkspace = (workspace: WorkspaceRole) => {
    setActiveWorkspace(workspace);
    setCurrentUser(prev => ({
      ...prev,
      activeWorkspace: workspace
    }));
  };

  const switchSubscriptionTier = (tier: SubscriptionTier) => {
    setCurrentUser(prev => ({
      ...prev,
      subscriptionTier: tier
    }));
  };

  const addJob = (newJobData: Partial<JobListing>): JobListing => {
    const created: JobListing = {
      id: `job-${Date.now()}`,
      posterId: currentUser.id,
      title: newJobData.title || 'Finance Professional',
      companyName: newJobData.companyName || 'Corporate Entity',
      category: newJobData.category || 'JOB',
      department: newJobData.department || 'Accounting & Finance',
      jobType: newJobData.jobType || 'Full-time',
      qualification: newJobData.qualification || ['CA'],
      minExperienceYears: newJobData.minExperienceYears ?? 0,
      salaryDisplay: newJobData.salaryDisplay || 'Salary Negotiable',
      location: newJobData.location || 'Location not specified',
      workMode: newJobData.workMode || 'On-site',
      description: newJobData.description || 'Job requirements posted via FinExchange platform.',
      responsibilities: newJobData.responsibilities || ['Manage financial & audit deliverables.'],
      requirements: newJobData.requirements || ['Relevant accounting or audit experience.'],
      skills: newJobData.skills || ['Finance', 'Accounting'],
      postedAt: 'Just now',
      viewsCount: 1,
      applicationsCount: 0,
      rawWhatsappSource: newJobData.rawWhatsappSource,
      isAiGenerated: !!newJobData.isAiGenerated,
      verificationStatus: 'VERIFIED'
    };
    setJobs(prev => [created, ...prev]);
    return created;
  };

  const addCompany = (newCompData: Partial<CompanyListing>): CompanyListing => {
    const created: CompanyListing = {
      id: `comp-${Date.now()}`,
      sellerId: currentUser.id,
      sellerName: currentUser.fullName,
      sellerEmail: currentUser.email,
      sellerPhone: currentUser.phone,
      sellerContactVisibility: newCompData.sellerContactVisibility || 'PLATFORM_ONLY',
      listingTitle: newCompData.listingTitle || 'Registered Business Entity',
      companyType: newCompData.companyType || 'Private Limited',
      industry: newCompData.industry || 'IT & Software',
      incorporationYear: newCompData.incorporationYear || 2021,
      registeredCity: newCompData.registeredCity || 'Hyderabad',
      registeredState: newCompData.registeredState || 'Telangana',
      askingPrice: newCompData.askingPrice || 2500000,
      askingPriceDisplay: newCompData.askingPriceDisplay || '₹25.0 Lakhs',
      businessStatus: newCompData.businessStatus || 'Active Business',
      gstRegistered: newCompData.gstRegistered ?? true,
      complianceStatus: newCompData.complianceStatus || 'Up-to-Date (ROC & GST)',
      description: newCompData.description || 'Verified entity available for corporate acquisition.',
      isVerified: true,
      verifications: {
        identityVerified: true,
        companyDetailsVerified: true,
        rocVerified: true,
        gstVerified: true,
        documentsVerified: true
      },
      documentsCount: 4,
      postedAt: 'Just now',
      enquiriesCount: 0,
      ndaStatus: 'NOT_REQUESTED',
      rawWhatsappSource: newCompData.rawWhatsappSource
    };
    setCompanies(prev => [created, ...prev]);
    return created;
  };

  const addBuyRequest = (reqData: Partial<AcquisitionRequest>): AcquisitionRequest => {
    const created: AcquisitionRequest = {
      id: `req-${Date.now()}`,
      buyerId: currentUser.id,
      buyerName: currentUser.fullName,
      preferredIndustry: reqData.preferredIndustry || 'IT & Software',
      preferredLocation: reqData.preferredLocation || 'Pan-India',
      budgetMin: reqData.budgetMin || 1000000,
      budgetMax: reqData.budgetMax || 5000000,
      budgetDisplay: reqData.budgetDisplay || '₹10L – ₹50L',
      minCompanyAgeYears: reqData.minCompanyAgeYears || 3,
      specificRequirements: reqData.specificRequirements || 'Clean entity requirement.',
      postedAt: 'Just now'
    };
    setBuyRequests(prev => [created, ...prev]);
    return created;
  };

  const applyForJob = (jobId: string, coverNote?: string): boolean => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return false;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      companyName: targetJob.companyName,
      applicantId: currentUser.id,
      applicantName: currentUser.fullName,
      applicantEmail: currentUser.email,
      applicantPhone: currentUser.phone,
      qualification: currentUser.roles.includes('CA') ? 'CA' : 'Finance Professional',
      experienceYears: 5,
      coverNote: coverNote || 'Applying via FinExchange platform.',
      appliedAt: 'Just now',
      stage: 'APPLIED',
      status: 'SUBMITTED'
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j));
    return true;
  };

  const updateApplicationStage = (appId: string, stage: ApplicationStage) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, stage } : app));
  };

  const submitCompanyEnquiry = (companyId: string, message: string, proposedPrice?: string): boolean => {
    const comp = companies.find(c => c.id === companyId);
    if (!comp) return false;

    const newEnq: CompanyEnquiry = {
      id: `enq-${Date.now()}`,
      companyId,
      companyTitle: comp.listingTitle,
      buyerId: currentUser.id,
      buyerName: currentUser.fullName,
      buyerEmail: currentUser.email,
      buyerPhone: currentUser.phone,
      proposedPrice: proposedPrice || comp.askingPriceDisplay,
      message,
      submittedAt: 'Just now',
      status: 'PENDING'
    };

    setEnquiries(prev => [newEnq, ...prev]);
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, ndaStatus: 'REQUESTED', enquiriesCount: c.enquiriesCount + 1 } : c));
    return true;
  };

  const requestNdaAccess = (companyId: string) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, ndaStatus: 'REQUESTED' } : c));
  };

  const approveNdaAccess = (companyId: string) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, ndaStatus: 'APPROVED' } : c));
    setEnquiries(prev => prev.map(e => e.companyId === companyId ? { ...e, status: 'DOCUMENT_ACCESS_GRANTED' } : e));
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
  };

  const toggleSaveCompany = (companyId: string) => {
    setSavedCompanyIds(prev => prev.includes(companyId) ? prev.filter(id => id !== companyId) : [...prev, companyId]);
  };

  const toggleCompareCompany = (companyId: string) => {
    setComparedCompanyIds(prev => {
      if (prev.includes(companyId)) return prev.filter(id => id !== companyId);
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 companies simultaneously.');
        return prev;
      }
      return [...prev, companyId];
    });
  };

  const clearComparedCompanies = () => {
    setComparedCompanyIds([]);
  };

  const createSavedSearch = (title: string, type: 'JOB' | 'COMPANY' | 'PROFESSIONAL', queryText: string) => {
    const newSrch: SavedSearch = {
      id: `srch-${Date.now()}`,
      title,
      type,
      queryText,
      alertEnabled: true,
      createdAt: 'Just now'
    };
    setSavedSearches(prev => [newSrch, ...prev]);
  };

  const verifyListing = (id: string, type: 'JOB' | 'COMPANY') => {
    if (type === 'JOB') {
      setJobs(prev => prev.map(j => j.id === id ? { ...j, verificationStatus: 'VERIFIED' } : j));
    } else {
      setCompanies(prev => prev.map(c => c.id === id ? { ...c, isVerified: true } : c));
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const sanitizedJobs = jobs.map(j => sanitizeJobListing(j, currentUser));
  const sanitizedCompanies = companies.map(c => {
    const hasApprovedNda = enquiries.some(
      e => e.companyId === c.id && e.buyerId === currentUser.id && e.status === 'DOCUMENT_ACCESS_GRANTED'
    );
    return sanitizeCompanyListing(c, currentUser, hasApprovedNda);
  });

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeWorkspace,
        switchRole,
        switchWorkspace,
        switchSubscriptionTier,
        jobs: sanitizedJobs,
        companies: sanitizedCompanies,
        buyRequests,
        professionals,
        applications,
        enquiries,
        savedJobIds,
        savedCompanyIds,
        comparedCompanyIds,
        savedSearches,
        notifications,
        addJob,
        addCompany,
        addBuyRequest,
        applyForJob,
        updateApplicationStage,
        submitCompanyEnquiry,
        requestNdaAccess,
        approveNdaAccess,
        toggleSaveJob,
        toggleSaveCompany,
        toggleCompareCompany,
        clearComparedCompanies,
        createSavedSearch,
        verifyListing,
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
