import { axios } from '01/axios';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  HousingStockFilterResponse,
  OrganizationUserListResponsePagedList,
  TaskFilterResponse,
} from 'myApi';

export const getTaskTypes = async (): Promise<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
> => {
  const res: TaskFilterResponse | null = await axios.get('Tasks/filters');

  return res?.taskTypes || null;
};

export const getHousingManagements = async (): Promise<
  GuidStringDictionaryItem[] | null
> => {
  const res = await axios.get<any, HousingStockFilterResponse>(
    '/HousingStocks/filters',
  );
  return res?.houseManagements;
};

export const getPerpetratorIds =
  (): Promise<OrganizationUserListResponsePagedList> =>
    axios.get('OrganizationUsers');
