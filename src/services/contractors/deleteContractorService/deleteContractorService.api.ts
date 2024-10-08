import { axios } from 'api/axios';
import { ContractorResponse } from 'api/types';

export const deleteContractor = (id: number): Promise<ContractorResponse> =>
  axios.delete(`Contractors/${id}`);
