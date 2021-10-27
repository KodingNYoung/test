import { USER_DETAILS, USER_TYPE, AUDITOR_ID, MERCHANT_ID } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
      };
    case USER_TYPE:
      return {
        ...state,
        user_type: action.payload,
      };
    case AUDITOR_ID:
      return {
        ...state,
        auditor_id: action.payload,
      };
    case MERCHANT_ID:
      return {
        ...state,
        merchant_id: action.payload,
      };

    default:
      return state;
  }
};
