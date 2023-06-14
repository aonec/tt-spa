import { axios } from '01/axios';
import { HomeownerCertificateResponse } from 'myApi';

export const getHomeownerCertificate = (
  id: string,
): Promise<HomeownerCertificateResponse> =>
  axios.get(`HomeownerAccounts/${id}/Certificate`);
