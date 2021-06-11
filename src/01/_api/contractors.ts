import { PagedContractorResponse } from './../../myApi';
import axios from '01/axios';
import { ContractorCreateRequest, ContractorResponse } from 'myApi';

export const postContractors = (
  requestPayload: ContractorCreateRequest
): Promise<ContractorResponse> => {
  return axios.post('Contractors', requestPayload);
};

export const requestContractors = (): Promise<PagedContractorResponse> =>
  axios.get('Contractors');

export const deleteContractor = (id: number): Promise<ContractorResponse> =>
  axios.delete(`Contractors/${id}`);
