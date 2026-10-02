import { CompanyListing, AcquisitionRequest, JobListing, ProfessionalProfile } from '../types';

export interface CompanyBuyerMatchResult {
  buyerRequest: AcquisitionRequest;
  matchScore: number; // 0 - 100
  matchReasons: string[];
}

export interface JobCandidateMatchResult {
  candidate: ProfessionalProfile;
  matchScore: number; // 0 - 100
  matchReasons: string[];
}

export interface QualityScoreResult {
  score: number; // 0 - 100
  checklist: { label: string; passed: boolean }[];
}

/**
 * AI Smart Matching Engine: Matches a Company Listing with active Buyer Acquisition Requests
 */
export function matchCompanyWithBuyers(
  company: CompanyListing,
  buyRequests: AcquisitionRequest[]
): CompanyBuyerMatchResult[] {
  if (!company || !buyRequests || buyRequests.length === 0) return [];

  const results: CompanyBuyerMatchResult[] = [];

  buyRequests.forEach(req => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Industry Fit (40 points)
    const reqInd = req.preferredIndustry.toLowerCase();
    const compInd = company.industry.toLowerCase();
    if (reqInd.includes(compInd) || compInd.includes(reqInd) || reqInd.includes('any')) {
      score += 40;
      reasons.push(`✓ Industry Match (${company.industry})`);
    } else {
      score += 15;
      reasons.push(`~ Multi-sector Cross Match`);
    }

    // 2. Budget Fit (30 points)
    if (company.askingPrice >= req.budgetMin && company.askingPrice <= req.budgetMax) {
      score += 30;
      reasons.push(`✓ Budget Fit (${company.askingPriceDisplay} within ${req.budgetDisplay})`);
    } else if (company.askingPrice <= req.budgetMax * 1.15) {
      score += 20;
      reasons.push(`✓ Close Budget Range`);
    } else {
      score += 10;
    }

    // 3. Location Overlap (20 points)
    const reqLoc = req.preferredLocation.toLowerCase();
    const compCity = company.registeredCity.toLowerCase();
    const compState = company.registeredState.toLowerCase();
    if (reqLoc.includes(compCity) || reqLoc.includes(compState) || reqLoc.includes('any') || reqLoc.includes('india')) {
      score += 20;
      reasons.push(`✓ Location Match (${company.registeredCity})`);
    } else {
      score += 5;
    }

    // 4. Incorporation Age / Vintage (10 points)
    const currentYear = new Date().getFullYear();
    const companyAge = currentYear - company.incorporationYear;
    if (companyAge >= req.minCompanyAgeYears) {
      score += 10;
      reasons.push(`✓ Incorporation Vintage (${companyAge} Yrs Age >= ${req.minCompanyAgeYears} Yrs Target)`);
    } else {
      score += 5;
    }

    if (score >= 40) {
      results.push({
        buyerRequest: req,
        matchScore: Math.min(100, score),
        matchReasons: reasons
      });
    }
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * AI Smart Matching Engine: Matches a Job Listing with Qualified Professional Mini-CVs
 */
export function matchJobWithProfessionals(
  job: JobListing,
  professionals: ProfessionalProfile[]
): JobCandidateMatchResult[] {
  if (!job || !professionals || professionals.length === 0) return [];

  const results: JobCandidateMatchResult[] = [];

  professionals.forEach(cand => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Qualification Match (40 points)
    const qualMatch = job.qualification.some(q => 
      cand.primaryQualification === q || 
      cand.skills.some(s => s.toLowerCase().includes(q.toLowerCase()))
    );
    if (qualMatch) {
      score += 40;
      reasons.push(`✓ Qualification Alignment (${cand.primaryQualification})`);
    } else {
      score += 15;
    }

    // 2. Experience Level (30 points)
    if (cand.totalExperienceYears >= job.minExperienceYears) {
      score += 30;
      reasons.push(`✓ Experience Met (${cand.totalExperienceYears} Yrs >= ${job.minExperienceYears} Yrs Min)`);
    } else {
      score += 10;
    }

    // 3. Location Overlap (15 points)
    const jobLoc = job.location.toLowerCase();
    const candLoc = cand.location.toLowerCase();
    if (jobLoc.includes(candLoc) || candLoc.includes(jobLoc) || job.workMode === 'Remote') {
      score += 15;
      reasons.push(`✓ Location / WorkMode (${job.workMode})`);
    } else {
      score += 5;
    }

    // 4. Skill Tags Overlap (15 points)
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const candSkills = cand.skills.map(s => s.toLowerCase());
    const matchedSkills = candSkills.filter(cs => jobSkills.some(js => js.includes(cs) || cs.includes(js)));

    if (matchedSkills.length > 0) {
      score += 15;
      reasons.push(`✓ Skill Overlap (${matchedSkills.slice(0, 2).join(', ')})`);
    } else {
      score += 5;
    }

    if (score >= 45) {
      results.push({
        candidate: cand,
        matchScore: Math.min(100, score),
        matchReasons: reasons
      });
    }
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Calculates Listing Quality Score / Completeness Index (0-100%)
 */
export function calculateListingQualityScore(
  item: CompanyListing | JobListing, 
  type: 'COMPANY' | 'JOB'
): QualityScoreResult {
  const checklist: { label: string; passed: boolean }[] = [];
  let score = 0;

  if (type === 'COMPANY') {
    const comp = item as CompanyListing;

    const checks = [
      { label: 'Basic Info & Incorporation Year', passed: Boolean(comp.listingTitle && comp.incorporationYear) },
      { label: 'Registered City & State', passed: Boolean(comp.registeredCity && comp.registeredState) },
      { label: 'Disclosed Asking Price & Turnover', passed: Boolean(comp.askingPrice && comp.askingPrice > 0) },
      { label: 'ROC Compliance Verification', passed: comp.verifications?.rocVerified ?? false },
      { label: 'GST Status Verification', passed: comp.verifications?.gstVerified ?? false },
      { label: 'Confidential Documents Vault', passed: (comp.documentsCount || (comp.documents?.length ?? 0)) > 0 }
    ];

    checks.forEach(c => {
      if (c.passed) score += 16.66;
      checklist.push(c);
    });
  } else {
    const job = item as JobListing;

    const checks = [
      { label: 'Role Title & Department', passed: Boolean(job.title && job.department) },
      { label: 'Qualification Requirement', passed: Boolean(job.qualification && job.qualification.length > 0) },
      { label: 'Salary / Stipend Range Disclosed', passed: Boolean(job.salaryDisplay) },
      { label: 'Location & Work Mode', passed: Boolean(job.location && job.workMode) },
      { label: 'Employer Verification Status', passed: job.verificationStatus === 'VERIFIED' },
      { label: 'Structured Skill Tags', passed: Boolean(job.skills && job.skills.length > 0) }
    ];

    checks.forEach(c => {
      if (c.passed) score += 16.66;
      checklist.push(c);
    });
  }

  return {
    score: Math.min(100, Math.round(score)),
    checklist
  };
}
