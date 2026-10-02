import { JobListing, CompanyListing, ProfessionalProfile, AcquisitionRequest, User } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-001',
  fullName: 'CA Rajesh Sharma',
  email: 'rajesh.sharma@ca-assoc.in',
  phone: '+91 98490 12345',
  roles: ['CA', 'RECRUITER', 'COMPANY_SELLER', 'CANDIDATE', 'COMPANY_BUYER', 'PROFESSIONAL'],
  activeRole: 'CA',
  activeWorkspace: 'CANDIDATE',
  availableWorkspaces: ['CANDIDATE', 'RECRUITER', 'PROFESSIONAL', 'COMPANY_BUYER', 'COMPANY_SELLER'],
  isIdentityVerified: true,
  icaiNumber: 'ICAI-M-402918',
  companyName: 'Sharma & Associates CA Firm',
  createdAt: '2024-01-15'
};

export const SEED_JOBS: JobListing[] = [
  {
    id: 'job-solenis-01',
    posterId: 'usr-002',
    title: 'CMA Industrial Trainee / FP&A Internship',
    companyName: 'Solenis GSS India Pvt Ltd',
    category: 'INTERNSHIP',
    department: 'FP&A / Costing',
    jobType: 'Articleship',
    qualification: ['CMA', 'Fresher'],
    minExperienceYears: 0,
    maxExperienceYears: 1,
    salaryMin: 30000,
    salaryMax: 35000,
    salaryDisplay: '₹30,000 – ₹35,000 / month',
    location: 'Hyderabad (Gachibowli)',
    workMode: 'Hybrid',
    description: 'Internship role in Solenis GSS India Pvt Ltd within FP&A cost department. Looking for qualified CMA or CMA intermediate freshers with strong analytical skills in costing, variance analysis, and corporate budgeting.',
    responsibilities: [
      'Assist in monthly cost center variance analysis and financial planning.',
      'Prepare product costing reports and gross margin dashboards.',
      'Support internal audit & SAP ERP finance module data entry.'
    ],
    requirements: [
      'Qualified CMA / CMA Intermediate passed candidate.',
      'Proficiency in Advanced Excel (VLOOKUP, Pivot Tables, XLOOKUP).',
      'Strong fundamentals in Management Accounting and Corporate Finance.'
    ],
    skills: ['FP&A', 'Cost Accounting', 'SAP ERP', 'Excel Variance Analysis', 'CMA'],
    postedAt: '2 hours ago',
    viewsCount: 142,
    applicationsCount: 18,
    rawWhatsappSource: `Internship in solenis gss india pvt ltd.
Domain: FP and A cost department.
Requirement: qualified CMA and fresher.
Salary: 30k to 35k.
Interested candidates DM cv.`,
    isAiGenerated: true,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'job-tax-mgr-02',
    posterId: 'usr-001',
    title: 'Senior Tax Manager (Direct & Indirect Tax)',
    companyName: 'Kothari & Co Chartered Accountants',
    category: 'JOB',
    department: 'Taxation & GST',
    jobType: 'Full-time',
    qualification: ['CA'],
    minExperienceYears: 4,
    maxExperienceYears: 8,
    salaryMin: 1400000,
    salaryMax: 1800000,
    salaryDisplay: '₹14.0 – ₹18.0 LPA',
    location: 'Chennai (Nungambakkam)',
    workMode: 'On-site',
    description: 'Leading CA firm in Chennai seeking a qualified Chartered Accountant with 4-8 years experience handling Income Tax assessments, Transfer Pricing documentation, and complex GST litigation.',
    responsibilities: [
      'Lead ITAT and Tax Audit filings for corporate clients.',
      'Represent clients before Income Tax & GST Appellate authorities.',
      'Manage team of CA Article assistants and junior accountants.'
    ],
    requirements: [
      'CA Qualification with active ICAI Membership.',
      'Proven experience in corporate tax compliance and appellate representation.',
      'In-depth knowledge of Income Tax Act 1961 and CGST/SGST Acts.'
    ],
    skills: ['Corporate Tax', 'GST Litigation', 'Transfer Pricing', 'Income Tax Appellate', 'ICAI'],
    postedAt: '1 day ago',
    viewsCount: 380,
    applicationsCount: 42,
    rawWhatsappSource: `CA firm looking for audit & tax manager
4-8 years experience
Chennai Nungambakkam
Salary 14-18L
Interested share resume`,
    isAiGenerated: true,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'job-stat-audit-03',
    posterId: 'usr-003',
    title: 'Statutory Audit Assistant Manager',
    companyName: 'BDO India LLP',
    category: 'JOB',
    department: 'Audit & Assurance',
    jobType: 'Full-time',
    qualification: ['CA'],
    minExperienceYears: 2,
    maxExperienceYears: 5,
    salaryMin: 1100000,
    salaryMax: 1500000,
    salaryDisplay: '₹11.0 – ₹15.0 LPA',
    location: 'Mumbai (BKC)',
    workMode: 'Hybrid',
    description: 'BDO India is hiring CA Qualified Statutory Audit professionals. Experience in Ind AS financial statement preparation, statutory audit of listed entities, and internal financial controls.',
    responsibilities: [
      'Execute end-to-end Statutory Audit engagements for listed & unlisted companies.',
      'Review compliance with Ind AS, Schedule III, and CARO 2020 reporting.',
      'Coordinate with client CFOs and finance teams.'
    ],
    requirements: [
      'CA Qualified with 2-5 years statutory audit post-qualification experience.',
      'Strong expertise in Ind AS financial reporting.'
    ],
    skills: ['Statutory Audit', 'Ind AS', 'CARO 2020', 'Big4/Mid-tier CA Experience'],
    postedAt: '2 days ago',
    viewsCount: 520,
    applicationsCount: 65,
    isAiGenerated: false,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'job-cs-executive-04',
    posterId: 'usr-004',
    title: 'Assistant Company Secretary (ROC & Board Compliance)',
    companyName: 'Hetero Healthcare Ltd',
    category: 'JOB',
    department: 'Corporate Law & Compliance',
    jobType: 'Full-time',
    qualification: ['CS'],
    minExperienceYears: 3,
    maxExperienceYears: 6,
    salaryMin: 900000,
    salaryMax: 1300000,
    salaryDisplay: '₹9.0 – ₹13.0 LPA',
    location: 'Hyderabad (Hitec City)',
    workMode: 'On-site',
    description: 'Leading pharma company looking for a qualified Company Secretary (ICSI member) to manage corporate secretarial compliance, board meetings, ROC annual returns, and SEBI regulations.',
    responsibilities: [
      'Draft Board agendas, minutes, and shareholder resolutions.',
      'Handle ROC e-filings (MGT-7, AOC-4, DIR-12, PAS-3).',
      'Ensure compliance under Companies Act 2013 and secretarial standards.'
    ],
    requirements: [
      'Member of ICSI (Institute of Company Secretaries of India).',
      '3-6 years relevant secretarial experience in corporate sector.'
    ],
    skills: ['Company Law', 'ROC Filings', 'Secretarial Audit', 'Board Minutes', 'ICSI'],
    postedAt: '3 days ago',
    viewsCount: 290,
    applicationsCount: 24,
    isAiGenerated: false,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'job-vcfo-05',
    posterId: 'usr-005',
    title: 'Virtual CFO / Head of Finance',
    companyName: 'ScaleUp Fintech Solutions',
    category: 'JOB',
    department: 'Virtual CFO',
    jobType: 'Full-time',
    qualification: ['CA', 'CMA', 'CFO'],
    minExperienceYears: 8,
    maxExperienceYears: 15,
    salaryMin: 2800000,
    salaryMax: 3600000,
    salaryDisplay: '₹28.0 – ₹36.0 LPA',
    location: 'Bengaluru (Koramangala)',
    workMode: 'Hybrid',
    description: 'High-growth Series B Fintech startup seeking a seasoned CA/CMA as Virtual CFO. Responsible for capital raising strategy, investor reporting, treasury management, and MIS governance.',
    responsibilities: [
      'Drive strategic financial planning, budgeting, and unit economics optimization.',
      'Lead fundraising due diligence and investor cap-table management.',
      'Oversee regulatory compliance, RBI guidelines for fintech, and tax audits.'
    ],
    requirements: [
      'CA/CMA qualified with 8+ years leadership experience in tech/fintech space.'
    ],
    skills: ['Virtual CFO', 'Fundraising', 'SaaS Financial Modeling', 'Treasury', 'Investor Relations'],
    postedAt: 'Just now',
    viewsCount: 190,
    applicationsCount: 11,
    isAiGenerated: false,
    verificationStatus: 'VERIFIED'
  }
];

export const SEED_COMPANIES: CompanyListing[] = [
  {
    id: 'comp-sale-01',
    sellerId: 'usr-001',
    listingTitle: '2019 Registered Private Limited IT Services Company',
    companyType: 'Private Limited',
    industry: 'IT & Software',
    incorporationYear: 2019,
    registeredCity: 'Hyderabad',
    registeredState: 'Telangana',
    askingPrice: 2500000,
    askingPriceDisplay: '₹25.0 Lakhs',
    businessStatus: 'Active Business',
    annualTurnover: '₹45 Lakhs',
    employeeCount: '8-12 Engineers',
    gstRegistered: true,
    complianceStatus: 'Up-to-Date (ROC & GST)',
    description: 'Active IT software development firm registered in 2019 at Hyderabad. Clean balance sheet, zero existing liabilities, valid GST registration, active bank account in HDFC. Ideal for entrepreneurs looking for immediate bidding eligibility.',
    isVerified: true,
    verifications: {
      identityVerified: true,
      companyDetailsVerified: true,
      rocVerified: true,
      gstVerified: true,
      documentsVerified: true
    },
    documentsCount: 5,
    postedAt: '1 day ago',
    enquiriesCount: 14,
    ndaStatus: 'NOT_REQUESTED',
    rawWhatsappSource: `2019 registered Pvt Ltd IT company available for sale.
Hyderabad.
Asking price 25 lakhs.
Active company clean ROC.`
  },
  {
    id: 'comp-sale-02',
    sellerId: 'usr-006',
    listingTitle: 'Clean Shell Pharma & Healthcare Pvt Ltd Company',
    companyType: 'Private Limited',
    industry: 'Pharmaceuticals',
    incorporationYear: 2021,
    registeredCity: 'Mumbai',
    registeredState: 'Maharashtra',
    askingPrice: 1200000,
    askingPriceDisplay: '₹12.0 Lakhs',
    businessStatus: 'Clean Track Record',
    annualTurnover: 'Dormant / No Revenue',
    employeeCount: 'None',
    gstRegistered: true,
    complianceStatus: 'Up-to-Date (ROC & GST)',
    description: 'Dormant pharma private limited incorporation certificate with drug distribution code. Zero debts, audited tax returns filed till FY 2024. Ready for transfer within 7 working days.',
    isVerified: true,
    verifications: {
      identityVerified: true,
      companyDetailsVerified: true,
      rocVerified: true,
      gstVerified: true,
      documentsVerified: false
    },
    documentsCount: 4,
    postedAt: '2 days ago',
    enquiriesCount: 8,
    ndaStatus: 'NOT_REQUESTED',
    rawWhatsappSource: `Pharma pvt ltd company sale 2021 reg
Mumbai location
12 Lakhs asking price
Clean ROC and GST filings done`
  },
  {
    id: 'comp-sale-03',
    sellerId: 'usr-007',
    listingTitle: 'Established 10-Year Old Logistics & Transport LLP',
    companyType: 'LLP',
    industry: 'Logistics',
    incorporationYear: 2014,
    registeredCity: 'Bengaluru',
    registeredState: 'Karnataka',
    askingPrice: 4500000,
    askingPriceDisplay: '₹45.0 Lakhs',
    businessStatus: 'Active Business',
    annualTurnover: '₹1.8 Crores',
    employeeCount: '25+',
    gstRegistered: true,
    complianceStatus: 'Up-to-Date (ROC & GST)',
    description: 'Running logistics entity with active enterprise vendor contracts, fleet vendor tie-ups, and established bank credit limits. High vintage score useful for large PSU tender participations.',
    isVerified: true,
    verifications: {
      identityVerified: true,
      companyDetailsVerified: true,
      rocVerified: true,
      gstVerified: true,
      documentsVerified: true
    },
    documentsCount: 7,
    postedAt: '4 days ago',
    enquiriesCount: 22,
    ndaStatus: 'NOT_REQUESTED'
  }
];

export const SEED_BUY_REQUESTS: AcquisitionRequest[] = [
  {
    id: 'buy-req-01',
    buyerId: 'usr-008',
    buyerName: 'Anand Varma (Angel Investor)',
    preferredIndustry: 'IT & Software',
    preferredLocation: 'Hyderabad or Bengaluru',
    budgetMin: 2000000,
    budgetMax: 5000000,
    budgetDisplay: '₹20L – ₹50L',
    minCompanyAgeYears: 5,
    specificRequirements: 'Looking for a 5+ year vintage IT company with active GST and no tax disputes for enterprise SaaS bidding.',
    postedAt: 'Yesterday'
  },
  {
    id: 'buy-req-02',
    buyerId: 'usr-009',
    buyerName: 'Srikanth Advisory Group',
    preferredIndustry: 'Financial Services / NBFC',
    preferredLocation: 'Mumbai / Delhi NCR',
    budgetMin: 5000000,
    budgetMax: 15000000,
    budgetDisplay: '₹50L – ₹1.5 Cr',
    minCompanyAgeYears: 3,
    specificRequirements: 'Urgent requirement for registered financial services company with clean balance sheet and tax clearances.',
    postedAt: '3 days ago'
  }
];

export const SEED_PROFESSIONALS: ProfessionalProfile[] = [
  {
    id: 'prof-01',
    userId: 'usr-001',
    name: 'CA Rajesh Sharma',
    title: 'Senior Tax & Audit Partner | ACA',
    primaryQualification: 'CA',
    membershipNumber: 'ICAI-M-402918',
    totalExperienceYears: 9,
    currentCompany: 'Sharma & Associates CA Firm',
    location: 'Hyderabad, Telangana',
    skills: ['Statutory Audit', 'GST Advisory', 'Direct Tax', 'ICAI Member', 'Transfer Pricing'],
    expectedSalaryDisplay: 'Consulting / Retainer',
    noticePeriodDays: 0,
    bio: 'Fellow Chartered Accountant with 9+ years of practice in direct taxation, GST litigation, statutory audit of listed entities, and corporate restructuring.',
    isAvailableForHire: true,
    isVerified: true,
    verifications: {
      identityVerified: true,
      companyDetailsVerified: true,
      rocVerified: true,
      gstVerified: true,
      documentsVerified: true
    },
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    experiences: [
      { company: 'Sharma & Associates CA Firm', role: 'Senior Tax Partner', duration: '2019 – Present' },
      { company: 'Deloitte India', role: 'Assistant Audit Manager', duration: '2016 – 2019' }
    ],
    education: [
      { degree: 'Chartered Accountant (ACA)', institution: 'ICAI New Delhi', year: '2015' },
      { degree: 'B.Com (Honours)', institution: 'Osmania University', year: '2013' }
    ],
    servicesOffered: ['Income Tax Appeals', 'GST Litigation', 'Ind AS Advisory', 'Statutory Audit']
  },
  {
    id: 'prof-02',
    userId: 'usr-010',
    name: 'CS Priya Venkatesh',
    title: 'Practicing Company Secretary | FCS',
    primaryQualification: 'CS',
    membershipNumber: 'ICSI-F-10294',
    totalExperienceYears: 7,
    currentCompany: 'PV Secretarial Consultants',
    location: 'Chennai, Tamil Nadu',
    skills: ['ROC Filings', 'Companies Act 2013', 'SEBI Compliance', 'Secretarial Audit', 'Mergers'],
    expectedSalaryDisplay: '₹15 – 18 LPA / Retainership',
    noticePeriodDays: 15,
    bio: 'Practicing CS specializing in secretarial audits, NCLT merger petitions, board advisory, and foreign direct investment (FDI) reporting.',
    isAvailableForHire: true,
    isVerified: true,
    verifications: {
      identityVerified: true,
      companyDetailsVerified: true,
      rocVerified: true,
      gstVerified: true,
      documentsVerified: true
    },
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    experiences: [
      { company: 'PV Secretarial Consultants', role: 'Managing Principal CS', duration: '2020 – Present' },
      { company: 'Sundaram Fasteners Ltd', role: 'Assistant Company Secretary', duration: '2017 – 2020' }
    ],
    education: [
      { degree: 'Fellow Company Secretary (FCS)', institution: 'ICSI New Delhi', year: '2017' }
    ],
    servicesOffered: ['NCLT Merger Petitions', 'Secretarial Audits', 'ROC Compliance']
  },
  {
    id: 'prof-03',
    userId: 'usr-011',
    name: 'CMA Vikramaditya Rao',
    title: 'Head of FP&A & Cost Audit | ACMA',
    primaryQualification: 'CMA',
    membershipNumber: 'ICMAI-39201',
    totalExperienceYears: 11,
    currentCompany: 'Apex Manufacturing Group',
    location: 'Bengaluru, Karnataka',
    skills: ['Cost Audit', 'FP&A', 'SAP CO Module', 'Plant Budgeting', 'Product Costing'],
    expectedSalaryDisplay: '₹24 – 28 LPA',
    noticePeriodDays: 30,
    bio: 'Experienced CMA with extensive background in manufacturing plant cost optimization, inventory valuation under CAS standards, and strategic CFO advisory.',
    isAvailableForHire: true,
    isVerified: true,
    verifications: {
      identityVerified: true,
      companyDetailsVerified: true,
      rocVerified: true,
      gstVerified: true,
      documentsVerified: true
    },
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    experiences: [
      { company: 'Apex Manufacturing Group', role: 'Head of FP&A & Costing', duration: '2018 – Present' }
    ],
    education: [
      { degree: 'Cost & Management Accountant (ACMA)', institution: 'ICMAI Kolkata', year: '2013' }
    ],
    servicesOffered: ['Cost Audit Reporting', 'Plant Cost Optimization', 'SAP CO Module Setup']
  }
];
