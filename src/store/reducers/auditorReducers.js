import {
  ALL_AUDITORS,
  ONE_AUDITOR,
  AUDITOR_MERCHANTS,
  MERCHANT_POLICIES,
  POLICIES_LENGTH,
  APPROVED_POLICIES,
  MERCHANT_EVIDENCES,
  EVIDENCES_LENGTH,
  APPROVED_EVIDENCES,
  MERCHANT_PENTESTS,
  MERCHANT_ASVSCANS,
} from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case ALL_AUDITORS:
      return {
        ...state,
        all_auditors: action.payload,
      };
    case ONE_AUDITOR:
      return {
        ...state,
        one_auditor: action.payload,
      };
    case AUDITOR_MERCHANTS:
      return {
        ...state,
        auditor_merchants: action.payload,
      };
    case MERCHANT_POLICIES:
      return {
        ...state,
        merchant_policies: action.payload,
      };
    case POLICIES_LENGTH:
      return {
        ...state,
        policies_length: action.payload,
      };
    case APPROVED_POLICIES:
      return {
        ...state,
        approved_policies: action.payload,
      };
    case MERCHANT_EVIDENCES:
      return {
        ...state,
        merchant_evidences: action.payload,
      };
    case EVIDENCES_LENGTH:
      return {
        ...state,
        evidences_length: action.payload,
      };
    case APPROVED_EVIDENCES:
      return {
        ...state,
        approved_evidences: action.payload,
      };
    case MERCHANT_PENTESTS:
      return {
        ...state,
        merchant_pentests: action.payload,
      };
    case MERCHANT_ASVSCANS:
      return {
        ...state,
        merchant_asvscans: action.payload,
      };
    default:
      return state;
  }
};
