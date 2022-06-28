import { axios } from '01/axios';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  TaskFilterResponse,
  TaskFilterResponseSuccessApiResponse,
} from 'myApi';

export const getTaskTypes = async (): Promise<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
> => {
  const res: TaskFilterResponse | null = await axios.get('Tasks/filters');

  return res?.taskTypes || null;
};
