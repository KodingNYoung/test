import {
  TOTAL_MONTHLY_TRANSACTIONS,
  DASHBOARD_CARDS,
  MERCHANT_USERS,
  ALL_AUDITS,
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
import { BaseURL } from 'config';
import { getToken } from 'utils';

export const getTransactionCharts = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/analysis/total_transaction`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: TOTAL_MONTHLY_TRANSACTIONS, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getDashboardCards = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/analysis/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: DASHBOARD_CARDS, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getUsers = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: MERCHANT_USERS, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getAudits =
  (page, { start, end }) =>
  async (dispatch) => {
    try {
      const res = await fetch(
        `${BaseURL}/v1/audits?page=${page}&start=${start}&end=${end}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await res.json();
      if (data.status === 'success') {
        dispatch({ type: ALL_AUDITS, payload: data.data });
        dispatch({
          type: AUDIT_PAGINATION,
          payload: {
            currentPage: data.meta.currentPage,
            totalPages: data.meta.totalPages,
          },
        });
        return {
          status: 'success',
          message: data.message,
        };
      }
      throw new Error(data.message);
    } catch (err) {
      return { status: 'failed', message: err.message };
    }
  };
export const createUser = (credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getUsers());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getUsers());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const inviteAuditor = (credentials) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'success') {
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getPolicies = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/policy/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: POLICIES, payload: data.data });
      dispatch({ type: TOTAL_POLICIES, payload: data.data.length });
      dispatch({
        type: APPR_POLICIES,
        payload: data.data.filter((item) => item.status !== 'pending').length,
      });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getDefaultPolicies = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/default-docs/policy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: DEFAULT_POLICIES, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const createPolicy = (credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/policy`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: credentials,
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getPolicies());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getEvidences = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/evidence/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: EVIDENCES, payload: data.data });
      dispatch({ type: TOTAL_EVIDENCES, payload: data.data.length });
      dispatch({
        type: APPR_EVIDENCES,
        payload: data.data.filter((item) => item.status !== 'pending').length,
      });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getDefaultEvidences = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/default-docs/evidence`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: DEFAULT_EVIDENCES, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const createEvidence = (credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/evidence`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: credentials,
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getEvidences());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getOnePolicy = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/policy/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: ONE_POLICY, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getOneEvidence = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/evidence/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: ONE_EVIDENCE, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getPolicyVersions = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/policy/${id}/version`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: POLICY_VERSIONS, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getEvidenceVersions = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/evidence/${id}/version`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: EVIDENCE_VERSIONS, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const approvePolicy = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/policy/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getPolicies());
      dispatch(getOnePolicy(id));
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const approveEvidence = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/evidence/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getEvidences());
      dispatch(getOneEvidence(id));
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const postPolicyVersion = (formData, id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/policy/${id}/version`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getPolicies());
      dispatch(getPolicyVersions(id));
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const postEvidenceVersion = (formData, id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/evidence/${id}/version`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getEvidences());
      dispatch(getEvidenceVersions(id));
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const postPolicyComment = (credentials, id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/policy/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getPolicies());
      dispatch(getOnePolicy(id));
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const postEvidenceComment = (credentials, id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/evidence/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getEvidences());
      dispatch(getOneEvidence(id));
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const deletePolicy = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/policy/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getPolicies());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const deleteEvidence = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/evidence/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getEvidences());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getPentests = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/pentests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: PENTESTS, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getPentestById = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/pentest/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: ONE_PENTEST, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const requestPentest = (credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/pentest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getPentests());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getASVScans = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/asvscans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: ASVSCANS, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getASVScanById = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/asvscan/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: ONE_ASVSCAN, payload: data.data });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const requestASVScan = (credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/asvscan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getASVScans());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const getMerchantProfile = () => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch({ type: MERCHANT_PROFILE, payload: data.data });
      dispatch({ type: MERCHANT_SUBDOMAIN, payload: data.data.subdomain });
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const updateMerchantProfile = (credentials) => async (dispatch) => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status === 'success') {
      dispatch(getMerchantProfile());
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
export const uploadLogo = (credentials) => async () => {
  try {
    const res = await fetch(`${BaseURL}/v1/merchant/upload-logo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: credentials,
    });
    const data = await res.json();
    if (data.status === 'success') {
      return {
        status: 'success',
        message: data.message,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    return { status: 'failed', message: err.message };
  }
};
