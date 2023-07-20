import { axios } from 'api/axios';
import { ContractorResponse, ContractorUpdateRequest } from 'api/types';

export const patchContractor = (payload: {
  contractorId: number;
  data: ContractorUpdateRequest;
}): Promise<ContractorResponse | null> => {
  return axios.put(`Contractors/${payload.contractorId}`, payload.data);
};
