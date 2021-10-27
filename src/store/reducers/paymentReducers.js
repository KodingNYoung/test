import {
  ALL_TRANSACTIONS,
  ALL_CUSTOMERS,
  CUSTOMER_PAGINATION,
  SUCCESSFUL_TRANSACTIONS,
  AVAILABLE_PROCESSORS,
  PAYMENT_MERCHANT,
} from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case ALL_TRANSACTIONS:
      return {
        ...state,
        all_transactions: action.payload,
      };
    case ALL_CUSTOMERS:
      return {
        ...state,
        all_customers: action.payload,
      };
    case SUCCESSFUL_TRANSACTIONS:
      return {
        ...state,
        successful_transactions: action.payload,
      };
    case CUSTOMER_PAGINATION:
      return {
        ...state,
        customer_pagination: action.payload,
      };
    case AVAILABLE_PROCESSORS:
      return {
        ...state,
        available_processors: action.payload,
      };
    case PAYMENT_MERCHANT:
      return {
        ...state,
        payment_merchant: action.payload,
      };
    default:
      return state;
  }
};
