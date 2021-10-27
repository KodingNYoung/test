import {
  ALL_TRANSACTIONS,
  ALL_CUSTOMERS,
  CUSTOMER_PAGINATION,
  SUCCESSFUL_TRANSACTIONS,
  AVAILABLE_PROCESSORS,
  PAYMENT_MERCHANT,
} from '../constants';
import { BaseURL, api_key, paymentToken } from 'config';
import { getToken } from 'utils';

export const getAllTransactions = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: ALL_TRANSACTIONS, payload: data.data });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getCustomers =
  ({ start, end }, page) =>
  async (dispatch) => {
    try {
      const res = await fetch(
        `${BaseURL}/v1/merchant/customers/?&start=${start}&end=${end}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await res.json();
      if (data.status === 'fail') throw new Error(data.message);
      dispatch({ type: ALL_CUSTOMERS, payload: data.data.customers.rows });
      dispatch({
        type: CUSTOMER_PAGINATION,
        payload: {
          currentPage: data.data.meta.currentPage,
          totalPages: data.data.meta.totalPages,
        },
      });
      return {
        status: 'success',
        message: data.message,
      };
    } catch (err) {
      return { status: 'failed', message: err.message };
    }
  };
export const getSuccessfulTransactions = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: SUCCESSFUL_TRANSACTIONS, payload: data.data });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getAvailableProcessors = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/variable/available-gateways`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: AVAILABLE_PROCESSORS, payload: data.data });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getMerchantByDomainName = (domain) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/get?subdomain=${domain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        api_key,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: PAYMENT_MERCHANT, payload: data.data });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const initiatePayment = (credentials, domain) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/payment/initiate/${domain}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${paymentToken}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 'fail') throw new Error(data.message);
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const authorizePayment = (credentials, domain) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/payment/authorize/${domain}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${paymentToken}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const verifyPayment = (credentials, domain) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/payment/verify/${domain}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${paymentToken}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
