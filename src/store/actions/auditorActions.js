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
import { BaseURL } from 'config';
import { getToken } from 'utils';

export const getAllAuditors = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/auditor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: ALL_AUDITORS, payload: data.data });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getOneAuditor = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: ONE_AUDITOR, payload: data.data });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getAuditorMerchants = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/merchants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: AUDITOR_MERCHANTS, payload: data.data });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getPoliciesByMerchantId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/${id}/policy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: MERCHANT_POLICIES, payload: data.data });
    dispatch({ type: POLICIES_LENGTH, payload: data.data.length });
    dispatch({
      type: APPROVED_POLICIES,
      payload: data.data.filter((item) => item.status !== 'pending').length,
    });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getEvidencesByMerchantId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/${id}/evidence`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: MERCHANT_EVIDENCES, payload: data.data });
    dispatch({ type: EVIDENCES_LENGTH, payload: data.data.length });
    dispatch({
      type: APPROVED_EVIDENCES,
      payload: data.data.filter((item) => item.status !== 'pending').length,
    });
    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getPentestRequest = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/pentests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: MERCHANT_PENTESTS, payload: data.data });

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getASVRequest = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/asvscans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch({ type: MERCHANT_ASVSCANS, payload: data.data });

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const uploadPentest = (id, credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/pentest/${id}/response`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: credentials,
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch(getPentestRequest());

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const uploadASV = (id, credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/asvscan/${id}/response`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: credentials,
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch(getASVRequest());

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const updateAuditor = (credentials) => async (dispatch, getState) => {
  const auditor_id = getState().authReducers.auditor_id;
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch(getOneAuditor(auditor_id));

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const uploadFile = (credentials, url) => async (dispatch, getState) => {
  const auditor_id = getState().authReducers.auditor_id;
  try {
    const res = await fetch(`${BaseURL}${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: credentials,
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch(getOneAuditor(auditor_id));

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const addCertification =
  (credentials, url) => async (dispatch, getState) => {
    const auditor_id = getState().authReducers.auditor_id;
    try {
      const res = await fetch(`${BaseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.status === 'fail') throw new Error(data.message);
      dispatch(getOneAuditor(auditor_id));

      return {
        status: 'success',
        message: data.message,
      };
    } catch (err) {
      return { status: 'failed', message: err.message };
    }
  };
export const updateCertification =
  (credentials, id) => async (dispatch, getState) => {
    const auditor_id = getState().authReducers.auditor_id;
    try {
      const res = await fetch(`${BaseURL}/v1/auditor/certification/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.status === 'fail') throw new Error(data.message);
      dispatch(getOneAuditor(auditor_id));

      return {
        status: 'success',
        message: data.message,
      };
    } catch (err) {
      return { status: 'failed', message: err.message };
    }
  };
export const addPortfolio = (credentials) => async (dispatch, getState) => {
  const auditor_id = getState().authReducers.auditor_id;
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/portfolio}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: credentials,
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch(getOneAuditor(auditor_id));

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const updatePortfolio =
  (credentials, id) => async (dispatch, getState) => {
    const auditor_id = getState().authReducers.auditor_id;
    try {
      const res = await fetch(`${BaseURL}/v1/auditor/portfolio/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: credentials,
      });
      const data = await res.json();
      if (data.status === 'fail') throw new Error(data.message);
      dispatch(getOneAuditor(auditor_id));

      return {
        status: 'success',
        message: data.message,
      };
    } catch (err) {
      return { status: 'failed', message: err.message };
    }
  };
export const deletePortfolio = (id) => async (dispatch, getState) => {
  const auditor_id = getState().authReducers.auditor_id;
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch(getOneAuditor(auditor_id));

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const deleteCertification = (id) => async (dispatch, getState) => {
  const auditor_id = getState().authReducers.auditor_id;
  try {
    const res = await fetch(`${BaseURL}/v1/auditor/certification/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    dispatch(getOneAuditor(auditor_id));

    return {
      status: 'success',
      message: data.message,
    };
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
