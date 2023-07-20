import { axios } from 'api/axios';
import { ContractorListResponsePagedList } from 'myApi';

export const getContractors = (): Promise<ContractorListResponsePagedList> =>
  axios.get('Contractors');
