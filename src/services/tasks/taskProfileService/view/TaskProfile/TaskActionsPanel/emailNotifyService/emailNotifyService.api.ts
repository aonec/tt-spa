import { axios } from 'api/axios';
import { ContractorListResponsePagedList } from 'api/types';

export const getContractors = (): Promise<ContractorListResponsePagedList> =>
  axios.get('Contractors');
