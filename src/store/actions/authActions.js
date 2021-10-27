import { USER_DETAILS, USER_TYPE, AUDITOR_ID, MERCHANT_ID } from '../constants';
import { BaseURL } from 'config';
import { setToken, getToken } from 'utils';

export const LoginUser = (logindetails) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logindetails),
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    setToken(data.token);
    dispatch({ type: USER_DETAILS, payload: data.data });
    dispatch({ type: USER_TYPE, payload: data.data.user_type });
    dispatch({ type: AUDITOR_ID, payload: data.data.auditor_id });
    dispatch({ type: MERCHANT_ID, payload: data.data.merchant_id });
    return {
      status: 'success',
      message: data.message,
      user_type: data.data.user_type,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const logoutAuditor = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    setToken('');
    dispatch({ type: USER_DETAILS, payload: {} });
    dispatch({ type: USER_TYPE, payload: '' });
    dispatch({ type: AUDITOR_ID, payload: null });
    dispatch({ type: MERCHANT_ID, payload: null });
    return {
      status: 'success',
      message: data.message,
      user_type: data.data.user_type,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const logoutMerchant = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/user/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    setToken('');
    dispatch({ type: USER_DETAILS, payload: {} });
    dispatch({ type: USER_TYPE, payload: '' });
    dispatch({ type: AUDITOR_ID, payload: null });
    dispatch({ type: MERCHANT_ID, payload: null });
    return {
      status: 'success',
      message: data.message,
      user_type: data.data.user_type,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const RegisterAuditor = (credentials) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
export const RegisterMerchant = (credentials) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
export const getPasswordToken = (credentials) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/misc/recover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const verifyPasswordToken = (credentials) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/misc/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!data.response) throw new Error(data.message);

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const resetPassword = (credentials) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/misc/reset`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
