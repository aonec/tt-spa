import { HomeownerCertificateResponse } from './../../myApi';
import axios from '01/axios';

export const getHomeownerCertificate = (
  id: number
): Promise<HomeownerCertificateResponse> =>
  axios.get(`HomeownerAccount/${id}/Certificate`);
