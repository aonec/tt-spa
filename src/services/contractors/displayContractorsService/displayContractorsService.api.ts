import { axios } from 'api/axios';
import {
  ContractorListResponse,
  ContractorListResponsePagedList,
} from 'api/types';

export const getContractors = async (): Promise<ContractorListResponse[]> => {
  const response: ContractorListResponsePagedList = await axios.get(
    'Contractors',
  );
  const contractors = response.items;
  return contractors || [];
};
