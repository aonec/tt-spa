import { axios } from '01/axios';
import { ContractorCreateRequest, ContractorResponse } from 'myApi';

export const postContractor = (
  request: ContractorCreateRequest
): Promise<ContractorResponse> => {
  return axios.post('Contractors', request);
};
