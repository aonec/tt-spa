import { axios } from 'api/axios';
import { ContractorCreateRequest, ContractorResponse } from 'api/types';

export const createContractor = (
  request: ContractorCreateRequest,
): Promise<ContractorResponse> => {
  return axios.post('Contractors', request);
};
