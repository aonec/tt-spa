import { axios } from 'api/axios';
import { ContractorResponse, ContractorUpdateRequest } from 'api/myApi';

export const patchContractor = (payload: {
  contractorId: number;
  data: ContractorUpdateRequest;
}): Promise<ContractorResponse | null> => {
  return axios.put(`Contractors/${payload.contractorId}`, payload.data);
};
