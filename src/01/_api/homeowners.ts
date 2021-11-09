import {
  HomeownerAccountCloseRequest,
  HomeownerAccountCreateServiceModel,
  HomeownerAccountReplaceRequest,
  HomeownerAccountResponse,
  HomeownerAccountSplitRequest,
  HomeownerAccountUpdateRequest,
  HomeownerCertificateResponse,
} from './../../myApi';
import axios from '01/axios';

export const getHomeownerCertificate = (
  id: number
): Promise<HomeownerCertificateResponse> =>
  axios.get(`HomeownerAccounts/${id}/Certificate`);

export const getHomeownerAccount = (
  id: string
): Promise<HomeownerAccountResponse> => axios.get(`HomeownerAccounts/${id}`);

export const putHomeownerAccount = ({
  id,
  data,
}: {
  id: string;
  data: HomeownerAccountUpdateRequest;
}): Promise<void> => axios.put(`HomeownerAccounts/${id}`, data);

export const replaceHomeownerAccount = (
  requestPayload: HomeownerAccountReplaceRequest
): Promise<void> => axios.post('HomeownerAccounts/Replace', requestPayload);

export const closeHomeownerAccount = (
  payload: HomeownerAccountCloseRequest
): Promise<void> => axios.post('HomeownerAccounts/Close', payload);

export const addHomeowner = (
  reqestPayload: HomeownerAccountCreateServiceModel
): Promise<void> => axios.post('HomeownerAccounts', reqestPayload);

export const splitHomeownerAccount = (
  data: HomeownerAccountSplitRequest
): Promise<void> => axios.post('HomeownerAccounts/Split', data);
