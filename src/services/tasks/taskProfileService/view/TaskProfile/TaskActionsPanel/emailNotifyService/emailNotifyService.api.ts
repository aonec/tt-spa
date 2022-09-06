import { axios } from '01/axios';
import { ContractorListResponsePagedList } from 'myApi';

export const getContractors = (): Promise<ContractorListResponsePagedList> =>
  axios.get('Contractors');
