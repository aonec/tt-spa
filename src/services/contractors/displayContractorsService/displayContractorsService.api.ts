import { axios } from '01/axios';
import { ContractorListResponse, ContractorListResponsePagedList } from 'myApi';

export const getContractors = async (): Promise<ContractorListResponse[]> => {
  const response: ContractorListResponsePagedList = await axios.get(
    'Contractors',
  );
  const contractors = response.items;
  return contractors || [];
};
