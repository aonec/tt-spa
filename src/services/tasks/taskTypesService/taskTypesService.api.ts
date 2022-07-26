import { axios } from '../../api/axios';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  HousingStockFilterResponse,
  TaskFilterResponse,
} from '../../api/types';

export const getTaskTypes = async (): Promise<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
> => {
  const res: TaskFilterResponse | null = await axios.get('Tasks/filters');

  return res?.taskTypes || null;
};

export const getHousingManagements = async (): Promise<GuidStringDictionaryItem[] | null> => {
  const res = await axios.get<any, HousingStockFilterResponse>('/HousingStocks/filters');
  return res?.houseManagements || null
};
