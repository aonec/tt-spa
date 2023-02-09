import { axios } from '01/axios';
import { ContractorResponse, ContractorUpdateRequest } from 'myApi';

export const patchContractor = (payload: {
  contractorId: number;
  data: ContractorUpdateRequest;
}): Promise<ContractorResponse | null> => {
  return axios.put(`Contractors/${payload.contractorId}`, payload.data);
};
