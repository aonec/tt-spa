import {
  HomeownerAccountResponse,
  HomeownerAccountUpdateRequest,
  HomeownerCertificateResponse,
} from './../../myApi';
import axios from '01/axios';

export const getHomeownerCertificate = (
  id: number
): Promise<HomeownerCertificateResponse> =>
  axios.get(`HomeownerAccount/${id}/Certificate`);

export const getHomeownerAccount = (
  id: string
): Promise<HomeownerAccountResponse> => axios.get(`HomeownerAccount/${id}`);

export const putHomeownerAccount = ({
  id,
  data,
}: {
  id: string;
  data: HomeownerAccountUpdateRequest;
}): Promise<void> => axios.put(`HomeownerAccount/${id}`, data);
