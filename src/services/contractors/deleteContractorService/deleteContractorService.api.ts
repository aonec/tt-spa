import { axios } from 'api/axios';
import { ContractorResponse } from 'myApi';

export const deleteContractor = (id: number): Promise<ContractorResponse> =>
  axios.delete(`Contractors/${id}`);
