import { axios } from 'api/axios';
import { ContractorListResponsePagedList } from 'api/myApi';

export const getContractors = (): Promise<ContractorListResponsePagedList> =>
  axios.get('Contractors');
