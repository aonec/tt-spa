import { axios } from '01/axios';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  HousingStockFilterResponse,
  TaskFilterResponse,
} from 'myApi';
import {
  perpetratorItemsProps,
  perpetratorProps,
} from './taskTypesService.types';

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
    '/HousingStocks/filters'
  );
  return res?.houseManagements || null;
};

export const getPerpetratorIds = async (): Promise<
  perpetratorItemsProps[] | null
> => {
  const res = await axios.get<any, perpetratorProps>('ManagingFirmUsers');
  return res?.items || null;
};
