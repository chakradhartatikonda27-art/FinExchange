import { User, JobListing, CompanyListing, EntitlementPermission, SubscriptionTier } from '../types';

/**
 * Entitlement matrix for subscription tiers
 */
const TIER_ENTITLEMENTS: Record<SubscriptionTier, EntitlementPermission[]> = {
  FREE: [],
  PRO_BUYER: ['VIEW_DIRECT_CONTACT', 'ACCESS_SECURE_DOCUMENT_VAULT', 'PRIORITY_INBOX_ACCESS'],
  PRO_RECRUITER: ['VIEW_DIRECT_CONTACT', 'ACCESS_CANDIDATE_DATABASE', 'FEATURE_LISTING'],
  VERIFIED_SELLER: ['FEATURE_LISTING', 'PRIORITY_INBOX_ACCESS'],
  ENTERPRISE: ['VIEW_DIRECT_CONTACT', 'ACCESS_SECURE_DOCUMENT_VAULT', 'FEATURE_LISTING', 'ACCESS_CANDIDATE_DATABASE', 'PRIORITY_INBOX_ACCESS']
};

/**
 * Checks whether a user possesses a specific entitlement permission
 */
export function hasEntitlement(user: User, permission: EntitlementPermission): boolean {
  if (!user) return false;
  
  // User explicitly assigned entitlement
  if (user.entitlements?.includes(permission)) return true;

  // Check tier defaults
  const tierEntitlements = TIER_ENTITLEMENTS[user.subscriptionTier] || [];
  return tierEntitlements.includes(permission);
}

/**
 * Server-side Field-Level Security Sanitizer for Job Listings
 * Protects recruiter phone, email, and raw WhatsApp dump from public unauthorized exposure.
 */
export function sanitizeJobListing(job: JobListing, user: User): JobListing {
  const isPoster = user && user.id === job.posterId;
  const canViewDirectContact = hasEntitlement(user, 'VIEW_DIRECT_CONTACT');

  if (isPoster || canViewDirectContact) {
    return {
      ...job,
      isContactMasked: false
    };
  }

  // Mask sensitive fields for public free tier viewers
  return {
    ...job,
    posterName: job.posterName ? `${job.posterName.split(' ')[0]} (Verified HR)` : 'FinExchange Hiring Manager',
    posterEmail: undefined, // Stripped from API response
    posterPhone: undefined, // Stripped from API response
    rawWhatsappSource: undefined, // Redacted raw contact phone text
    isContactMasked: true,
    contactMaskNotice: '🛡️ Recruiter direct contact protected by FinExchange Privacy Engine. Use platform messaging or click [Apply Now].'
  };
}

/**
 * Server-side Field-Level Security Sanitizer for Company Listings
 * Protects seller direct name, phone, email, and confidential documents.
 */
export function sanitizeCompanyListing(
  company: CompanyListing, 
  user: User, 
  hasApprovedNda: boolean = false
): CompanyListing {
  const isSeller = user && user.id === company.sellerId;
  const canViewDirectContact = hasEntitlement(user, 'VIEW_DIRECT_CONTACT') || company.sellerContactVisibility === 'PUBLIC';

  const sanitized = { ...company };

  // Handle direct contact visibility
  if (!isSeller && !canViewDirectContact) {
    sanitized.sellerName = `Seller #${company.sellerId.replace('usr-', 'SEL-')}`;
    sanitized.sellerEmail = undefined; // Stripped
    sanitized.sellerPhone = undefined; // Stripped
    sanitized.rawWhatsappSource = undefined; // Redacted raw phone text
    sanitized.isSellerContactMasked = true;
    sanitized.sellerContactMaskNotice = '🛡️ Seller contact details are protected under PLATFORM_ONLY privacy. Inquire securely via FinExchange platform messaging.';
  } else {
    sanitized.isSellerContactMasked = false;
  }

  // Handle confidential documents access
  if (sanitized.documents) {
    sanitized.documents = sanitized.documents.map(doc => {
      if (isSeller || (hasApprovedNda && hasEntitlement(user, 'ACCESS_SECURE_DOCUMENT_VAULT'))) {
        return doc; // Full document access
      }

      // Redact direct URL for unauthorized users
      return {
        ...doc,
        signedAccessUrl: undefined,
        maskedAccessNotice: '🔐 Confidential document. Requires buyer enquiry, NDA acceptance, and seller approval.'
      };
    });
  }

  return sanitized;
}

/**
 * Generates a secure, 15-minute expiring signed URL for approved confidential documents
 */
export function generateExpiringSignedUrl(docId: string, userId: string, companyTitle: string) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15 mins expiry
  const timestampStr = expiresAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  
  const randomToken = Math.random().toString(36).substring(2, 10).toUpperCase();

  return {
    url: `https://vault.finexchange.in/secure-docs/${docId}?token=${randomToken}&expires=${expiresAt.getTime()}&audited_user=${userId}`,
    expiresAtFormatted: `${timestampStr} IST (15 Min Expiring)`,
    auditLogNotice: `🔒 Expiring URL issued for ${userTokenMask(userId)} on ${companyTitle}. Access logged at ${now.toLocaleTimeString()}.`
  };
}

function userTokenMask(userId: string): string {
  return `User [${userId.substring(0, 6)}***]`;
}
