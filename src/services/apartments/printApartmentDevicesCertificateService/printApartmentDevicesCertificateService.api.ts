import { axios } from 'api/axios';
import { HomeownerCertificateResponse } from 'api/myApi';

export const getHomeownerCertificate = (
  id: string,
): Promise<HomeownerCertificateResponse> =>
  axios.get(`HomeownerAccounts/${id}/Certificate`);
