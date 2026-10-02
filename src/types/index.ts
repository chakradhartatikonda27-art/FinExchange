export type WorkspaceRole = 
  | 'CANDIDATE' 
  | 'RECRUITER' 
  | 'PROFESSIONAL' 
  | 'COMPANY_BUYER' 
  | 'COMPANY_SELLER';

export type UserRole = 
  | 'CANDIDATE' 
  | 'RECRUITER' 
  | 'EMPLOYER' 
  | 'COMPANY_SELLER' 
  | 'COMPANY_BUYER' 
  | 'PROFESSIONAL' 
  | 'CA' 
  | 'CS' 
  | 'CMA' 
  | 'AUDITOR' 
  | 'ACCOUNTANT' 
  | 'TAX_CONSULTANT' 
  | 'CFO' 
  | 'HR' 
  | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  roles: UserRole[];
  activeRole: UserRole;
  activeWorkspace: WorkspaceRole;
  availableWorkspaces: WorkspaceRole[];
  isIdentityVerified: boolean;
  icaiNumber?: string;
  companyName?: string;
  createdAt: string;
}

export type ListingCategory = 
  | 'JOB' 
  | 'INTERNSHIP' 
  | 'COMPANY_FOR_SALE' 
  | 'COMPANY_WANTED' 
  | 'PROFESSIONAL_SERVICE' 
  | 'PROFESSIONAL_PROFILE' 
  | 'ANNOUNCEMENT';

export interface VerificationLevels {
  identityVerified: boolean;
  companyDetailsVerified: boolean;
  rocVerified: boolean;
  gstVerified: boolean;
  documentsVerified: boolean;
}

export interface JobListing {
  id: string;
  posterId: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  category: 'JOB' | 'INTERNSHIP';
  department: 'Audit & Assurance' | 'Taxation & GST' | 'FP&A / Costing' | 'Accounting & Finance' | 'Corporate Law & Compliance' | 'Virtual CFO' | 'Internal Audit';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Articleship' | 'Industrial Training';
  qualification: ('CA' | 'CS' | 'CMA' | 'B.Com' | 'M.Com' | 'MBA Finance' | 'CFO' | 'Fresher')[];
  minExperienceYears: number;
  maxExperienceYears?: number;
  salaryMin?: number;
  salaryMax?: number;
  salaryDisplay: string;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  skills: string[];
  postedAt: string;
  viewsCount: number;
  applicationsCount: number;
  rawWhatsappSource?: string;
  isAiGenerated: boolean;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

export interface CompanyListing {
  id: string;
  sellerId: string;
  listingTitle: string;
  companyType: 'Private Limited' | 'LLP' | 'Partnership Firm' | 'Proprietorship' | 'Public Limited';
  industry: 'IT & Software' | 'Pharmaceuticals' | 'Healthcare' | 'Manufacturing' | 'Financial Services' | 'Trading & Distribution' | 'Logistics' | 'Consulting';
  incorporationYear: number;
  registeredCity: string;
  registeredState: string;
  askingPrice: number;
  askingPriceDisplay: string;
  businessStatus: 'Active Business' | 'Dormant Company' | 'Shell Entity' | 'Clean Track Record';
  annualTurnover?: string;
  employeeCount?: string;
  gstRegistered: boolean;
  complianceStatus: 'Up-to-Date (ROC & GST)' | 'Pending Filings' | 'Clean Certificate';
  description: string;
  isVerified: boolean;
  verifications: VerificationLevels;
  documentsCount: number;
  postedAt: string;
  enquiriesCount: number;
  rawWhatsappSource?: string;
  ndaStatus?: 'NOT_REQUESTED' | 'REQUESTED' | 'APPROVED' | 'DECLINED';
}

export interface AcquisitionRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  preferredIndustry: string;
  preferredLocation: string;
  budgetMin: number;
  budgetMax: number;
  budgetDisplay: string;
  minCompanyAgeYears: number;
  specificRequirements: string;
  postedAt: string;
}

export interface WorkExperienceItem {
  company: string;
  role: string;
  duration: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ProfessionalProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  primaryQualification: 'CA' | 'CS' | 'CMA' | 'CFO' | 'Tax Specialist' | 'Senior Auditor';
  membershipNumber?: string;
  totalExperienceYears: number;
  currentCompany?: string;
  location: string;
  skills: string[];
  expectedSalaryDisplay?: string;
  noticePeriodDays?: number;
  bio: string;
  isAvailableForHire: boolean;
  isVerified: boolean;
  verifications: VerificationLevels;
  avatarUrl?: string;
  experiences?: WorkExperienceItem[];
  education?: EducationItem[];
  servicesOffered?: string[];
}

export interface FieldCheck {
  fieldName: string;
  isIdentified: boolean;
  value?: string;
}

export interface AiParsedPayload {
  category: ListingCategory;
  confidenceScore: number;
  fieldChecks: FieldCheck[];
  extractedFields: {
    title?: string;
    companyName?: string;
    department?: string;
    qualification?: string[];
    experience?: string;
    salary?: string;
    location?: string;
    workMode?: string;
    jobType?: string;
    companyType?: string;
    industry?: string;
    incorporationYear?: string;
    askingPrice?: string;
    status?: string;
    contactInfo?: string;
  };
  missingFields: string[];
  rawText: string;
}

export type ApplicationStage = 'APPLIED' | 'SHORTLISTED' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  qualification: string;
  experienceYears: number;
  coverNote?: string;
  appliedAt: string;
  stage: ApplicationStage;
  status: 'SUBMITTED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
}

export interface CompanyEnquiry {
  id: string;
  companyId: string;
  companyTitle: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  proposedPrice?: string;
  message: string;
  submittedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'DOCUMENT_ACCESS_GRANTED' | 'REJECTED';
}

export interface SavedSearch {
  id: string;
  title: string;
  type: 'JOB' | 'COMPANY' | 'PROFESSIONAL';
  queryText: string;
  alertEnabled: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'APPLICATION' | 'ENQUIRY' | 'MATCHING_JOB' | 'MATCHING_COMPANY' | 'VERIFICATION';
  createdAt: string;
  isRead: boolean;
  contextLink?: string;
}
