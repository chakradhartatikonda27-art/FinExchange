import { AiParsedPayload, ListingCategory, FieldCheck } from '../types';

export function parseRawWhatsappPost(rawText: string): AiParsedPayload {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // 1. Determine Category
  let category: ListingCategory = 'JOB';
  if (lower.includes('internship') || lower.includes('article') || lower.includes('trainee') || lower.includes('stipend')) {
    category = 'INTERNSHIP';
  } else if (lower.includes('company for sale') || lower.includes('available for sale') || lower.includes('pvt ltd') && lower.includes('sale') || lower.includes('asking price')) {
    category = 'COMPANY_FOR_SALE';
  } else if (lower.includes('company wanted') || lower.includes('looking to buy') || lower.includes('requirement for company')) {
    category = 'COMPANY_WANTED';
  } else if (lower.includes('service') || lower.includes('consultant') || lower.includes('audit service')) {
    category = 'PROFESSIONAL_SERVICE';
  }

  const missingFields: string[] = [];
  const fieldChecks: FieldCheck[] = [];
  const extracted: AiParsedPayload['extractedFields'] = {};

  if (category === 'JOB' || category === 'INTERNSHIP') {
    // Extract Company Name
    const companyMatch = text.match(/(?:in|at|for|by)\s+([A-Za-z0-9\s.&'-]+(?:Pvt|Ltd|LLP|Inc|Group|CA|Firm|Associates))/i) 
      || text.match(/([A-Za-z0-9\s.&'-]+(?:Pvt Ltd|LLP|GSS India|Associates))/i);
    if (companyMatch) {
      extracted.companyName = companyMatch[1].trim();
      fieldChecks.push({ fieldName: 'Company Name', isIdentified: true, value: extracted.companyName });
    } else {
      extracted.companyName = 'Company name not specified';
      missingFields.push('Company Name');
      fieldChecks.push({ fieldName: 'Company Name', isIdentified: false });
    }

    // Role / Department
    if (lower.includes('fp and a') || lower.includes('fp&a') || lower.includes('costing') || lower.includes('cost department')) {
      extracted.department = 'FP&A / Costing';
      extracted.title = category === 'INTERNSHIP' ? 'CMA Industrial Trainee / FP&A Internship' : 'FP&A Analyst';
      fieldChecks.push({ fieldName: 'Domain / Department', isIdentified: true, value: 'FP&A / Costing' });
    } else if (lower.includes('statutory audit') || lower.includes('audit manager')) {
      extracted.department = 'Audit & Assurance';
      extracted.title = 'Audit Manager';
      fieldChecks.push({ fieldName: 'Domain / Department', isIdentified: true, value: 'Audit & Assurance' });
    } else {
      extracted.department = 'Accounting & Finance';
      extracted.title = category === 'INTERNSHIP' ? 'Finance Intern' : 'Finance Professional';
      fieldChecks.push({ fieldName: 'Domain / Department', isIdentified: true, value: 'Accounting & Finance' });
    }

    // Qualifications
    const quals: string[] = [];
    if (lower.includes('cma')) quals.push('CMA');
    if (lower.includes('ca')) quals.push('CA');
    if (lower.includes('cs')) quals.push('CS');
    if (lower.includes('fresher')) quals.push('Fresher');
    if (quals.length > 0) {
      extracted.qualification = quals;
      fieldChecks.push({ fieldName: 'Qualification Required', isIdentified: true, value: quals.join(', ') });
    } else {
      extracted.qualification = ['CA / CS / CMA / Finance Graduate'];
      missingFields.push('Qualification');
      fieldChecks.push({ fieldName: 'Qualification Required', isIdentified: false });
    }

    // Experience
    if (lower.includes('fresher')) {
      extracted.experience = 'Fresher (0 years)';
      fieldChecks.push({ fieldName: 'Experience Required', isIdentified: true, value: 'Fresher (0 years)' });
    } else {
      const expMatch = text.match(/(\d+[-–]\d+|\d+)\s*(?:years?|yrs?|yr)/i);
      if (expMatch) {
        extracted.experience = `${expMatch[1]} years`;
        fieldChecks.push({ fieldName: 'Experience Required', isIdentified: true, value: `${expMatch[1]} years` });
      } else {
        extracted.experience = 'Experience not specified';
        missingFields.push('Experience');
        fieldChecks.push({ fieldName: 'Experience Required', isIdentified: false });
      }
    }

    // Salary / Stipend
    const salaryMatch = text.match(/(?:salary|stipend|ctc)?\s*:?\s*(?:₹|rs\.?|inr)?\s*(\d+\s*k|\d+[-–]\d+\s*k|\d+[-–]\d+\s*lakhs?|\d+\s*lpa)/i);
    if (salaryMatch) {
      extracted.salary = salaryMatch[0].trim();
      fieldChecks.push({ fieldName: 'Salary / Stipend', isIdentified: true, value: extracted.salary });
    } else if (lower.includes('negotiable')) {
      extracted.salary = 'Salary Negotiable';
      fieldChecks.push({ fieldName: 'Salary / Stipend', isIdentified: true, value: 'Salary Negotiable' });
    } else {
      extracted.salary = 'Salary not specified';
      missingFields.push('Salary');
      fieldChecks.push({ fieldName: 'Salary / Stipend', isIdentified: false });
    }

    // Location
    const locations = ['hyderabad', 'chennai', 'mumbai', 'bengaluru', 'bangalore', 'delhi', 'noida', 'gurgaon', 'pune', 'kolkata'];
    const foundLoc = locations.find(loc => lower.includes(loc));
    if (foundLoc) {
      extracted.location = foundLoc.charAt(0).toUpperCase() + foundLoc.slice(1);
      fieldChecks.push({ fieldName: 'Location', isIdentified: true, value: extracted.location });
    } else {
      extracted.location = 'Location not specified';
      missingFields.push('Location');
      fieldChecks.push({ fieldName: 'Location', isIdentified: false });
    }

  } else if (category === 'COMPANY_FOR_SALE' || category === 'COMPANY_WANTED') {
    const yearMatch = text.match(/(20\d{2}|19\d{2})/);
    if (yearMatch) {
      extracted.incorporationYear = yearMatch[1];
      fieldChecks.push({ fieldName: 'Incorporation Year', isIdentified: true, value: yearMatch[1] });
    } else {
      extracted.incorporationYear = 'Year not specified';
      missingFields.push('Incorporation Year');
      fieldChecks.push({ fieldName: 'Incorporation Year', isIdentified: false });
    }

    if (lower.includes('pvt ltd') || lower.includes('private limited')) {
      extracted.companyType = 'Private Limited';
    } else {
      extracted.companyType = 'LLP / Entity';
    }
    fieldChecks.push({ fieldName: 'Company Type', isIdentified: true, value: extracted.companyType });

    const priceMatch = text.match(/(?:asking price|budget|price)?\s*:?\s*(?:₹|rs\.?|inr)?\s*(\d+\s*lakhs?|\d+[-–]\d+\s*lakhs?|\d+\s*cr)/i);
    if (priceMatch) {
      extracted.askingPrice = priceMatch[0].trim();
      fieldChecks.push({ fieldName: 'Asking Price', isIdentified: true, value: extracted.askingPrice });
    } else {
      extracted.askingPrice = 'Asking price not specified';
      missingFields.push('Asking Price');
      fieldChecks.push({ fieldName: 'Asking Price', isIdentified: false });
    }
  }

  const confidenceScore = Math.max(70, Math.min(98, Math.round(((fieldChecks.filter(f => f.isIdentified).length) / Math.max(1, fieldChecks.length)) * 100)));

  return {
    category,
    confidenceScore,
    fieldChecks,
    extractedFields: extracted,
    missingFields,
    rawText
  };
}
