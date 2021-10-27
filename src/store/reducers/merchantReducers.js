import {
  TOTAL_MONTHLY_TRANSACTIONS,
  DASHBOARD_CARDS,
  ALL_AUDITS,
  MERCHANT_USERS,
  AUDIT_PAGINATION,
  POLICIES,
  TOTAL_POLICIES,
  APPR_POLICIES,
  DEFAULT_POLICIES,
  EVIDENCES,
  TOTAL_EVIDENCES,
  APPR_EVIDENCES,
  DEFAULT_EVIDENCES,
  ONE_POLICY,
  ONE_EVIDENCE,
  POLICY_VERSIONS,
  EVIDENCE_VERSIONS,
  PENTESTS,
  ASVSCANS,
  ONE_ASVSCAN,
  ONE_PENTEST,
  MERCHANT_PROFILE,
  MERCHANT_SUBDOMAIN,
} from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case TOTAL_MONTHLY_TRANSACTIONS:
      return {
        ...state,
        total_transactions: action.payload,
      };
    case DASHBOARD_CARDS:
      return {
        ...state,
        dashboard_cards: action.payload,
      };
    case MERCHANT_USERS:
      return {
        ...state,
        merchant_users: action.payload,
      };
    case ALL_AUDITS:
      return {
        ...state,
        all_audits: action.payload,
      };
    case AUDIT_PAGINATION:
      return {
        ...state,
        audit_pagination: action.payload,
      };
    case POLICIES:
      return {
        ...state,
        all_policies: action.payload,
      };
    case TOTAL_POLICIES:
      return {
        ...state,
        total_policies: action.payload,
      };
    case APPR_POLICIES:
      return {
        ...state,
        appr_policies: action.payload,
      };
    case EVIDENCES:
      return {
        ...state,
        all_evidences: action.payload,
      };
    case TOTAL_EVIDENCES:
      return {
        ...state,
        total_evidences: action.payload,
      };
    case APPR_EVIDENCES:
      return {
        ...state,
        appr_evidences: action.payload,
      };
    case DEFAULT_POLICIES:
      return {
        ...state,
        default_policies: action.payload,
      };
    case DEFAULT_EVIDENCES:
      return {
        ...state,
        default_evidences: action.payload,
      };
    case ONE_POLICY:
      return {
        ...state,
        one_policy: action.payload,
      };
    case ONE_EVIDENCE:
      return {
        ...state,
        one_evidence: action.payload,
      };
    case POLICY_VERSIONS:
      return {
        ...state,
        policy_versions: action.payload,
      };
    case EVIDENCE_VERSIONS:
      return {
        ...state,
        evidence_versions: action.payload,
      };
    case PENTESTS:
      return {
        ...state,
        all_pentests: action.payload,
      };
    case ASVSCANS:
      return {
        ...state,
        all_asvscans: action.payload,
      };
    case ONE_ASVSCAN:
      return {
        ...state,
        one_asvscan: action.payload,
      };
    case ONE_PENTEST:
      return {
        ...state,
        one_pentest: action.payload,
      };
    case MERCHANT_PROFILE:
      return {
        ...state,
        merchant_profile: action.payload,
      };
    case MERCHANT_SUBDOMAIN:
      return {
        ...state,
        merchant_subdomain: action.payload,
      };
    default:
      return state;
  }
};
