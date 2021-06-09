import { ContractorListResponse } from './../../myApi';
import axios from '01/axios';
import { ContractorCreateRequest, ContractorResponse } from 'myApi';

export const postContractors = (
  requestPayload: ContractorCreateRequest
): Promise<ContractorResponse> => {
  return axios.post('Contractors', requestPayload);
};

export const requestContractors = (): Promise<ContractorListResponse> =>
  axios.get('Contractors');
