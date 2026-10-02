export interface ParsedSmartQuery {
  rawQuery: string;
  category: 'ALL' | 'JOBS' | 'COMPANIES' | 'PROFESSIONALS';
  extractedFilters: {
    industry?: string;
    location?: string;
    maxBudget?: number;
    maxYear?: number;
    qualification?: string;
    minExp?: number;
  };
  detectedTags: string[];
}

export function parseSmartQuery(queryText: string): ParsedSmartQuery {
  const q = queryText.trim();
  const lower = q.toLowerCase();

  const detectedTags: string[] = [];
  const extractedFilters: ParsedSmartQuery['extractedFilters'] = {};
  let category: ParsedSmartQuery['category'] = 'ALL';

  // 1. Category Detection
  if (lower.includes('company') || lower.includes('pvt ltd') || lower.includes('llp') || lower.includes('sale') || lower.includes('buy')) {
    category = 'COMPANIES';
    detectedTags.push('Companies Search');
  } else if (lower.includes('job') || lower.includes('intern') || lower.includes('article') || lower.includes('hiring') || lower.includes('opening')) {
    category = 'JOBS';
    detectedTags.push('Jobs Search');
  } else if (lower.includes('ca') || lower.includes('cs') || lower.includes('cma') || lower.includes('auditor') || lower.includes('cfo')) {
    category = 'PROFESSIONALS';
    detectedTags.push('Professionals Search');
  }

  // 2. Industry Extraction
  if (lower.includes('it') || lower.includes('software') || lower.includes('tech')) {
    extractedFilters.industry = 'IT & Software';
    detectedTags.push('Industry: IT & Software');
  } else if (lower.includes('pharma') || lower.includes('drug') || lower.includes('health')) {
    extractedFilters.industry = 'Pharmaceuticals';
    detectedTags.push('Industry: Pharma');
  }

  // 3. Location Extraction
  const locations = ['hyderabad', 'chennai', 'mumbai', 'bengaluru', 'bangalore', 'delhi', 'pune', 'kolkata'];
  const foundLoc = locations.find(loc => lower.includes(loc));
  if (foundLoc) {
    const locCap = foundLoc.charAt(0).toUpperCase() + foundLoc.slice(1);
    extractedFilters.location = locCap;
    detectedTags.push(`Location: ${locCap}`);
  }

  // 4. Year Extraction (e.g., "before 2020", "2019 or older")
  const yearMatch = lower.match(/(?:before|older than|registered in)?\s*(20\d{2}|19\d{2})/);
  if (yearMatch) {
    extractedFilters.maxYear = parseInt(yearMatch[1]);
    detectedTags.push(`Year <= ${yearMatch[1]}`);
  }

  // 5. Budget / Salary Extraction (e.g. "under 50 lakhs", "under 50l", "under ₹50l")
  const budgetMatch = lower.match(/(?:under|below|max|budget)?\s*(?:₹|rs\.?)?\s*(\d+)\s*(?:lakhs?|l|cr)/);
  if (budgetMatch) {
    const num = parseInt(budgetMatch[1]);
    const isCr = lower.includes('cr');
    extractedFilters.maxBudget = isCr ? num * 10000000 : num * 100000;
    detectedTags.push(`Budget <= ₹${num}${isCr ? ' Cr' : 'L'}`);
  }

  // 6. Qualification Extraction
  if (lower.includes('cma')) {
    extractedFilters.qualification = 'CMA';
    detectedTags.push('Qual: CMA');
  } else if (lower.includes('ca')) {
    extractedFilters.qualification = 'CA';
    detectedTags.push('Qual: CA');
  } else if (lower.includes('cs')) {
    extractedFilters.qualification = 'CS';
    detectedTags.push('Qual: CS');
  }

  return {
    rawQuery: q,
    category,
    extractedFilters,
    detectedTags
  };
}

export const POPULAR_SEARCH_TAGS = [
  'CA Jobs in Hyderabad',
  'IT Companies under ₹50L',
  'CMA Industrial Trainee',
  'Pharma Companies for Sale',
  'Statutory Audit Managers',
  'Virtual CFO Consultants',
  'Clean Shell Pvt Ltd Companies'
];
