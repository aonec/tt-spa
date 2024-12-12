import { axios } from 'api/axios';
import {
  BuildingFiltersResponse,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  OrganizationUserListResponsePagedList,
  TaskFilterResponse,
} from 'api/types';

export const getTaskTypes = async (): Promise<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
> => {
  const res: TaskFilterResponse | null = await axios.get('Tasks/filters');

  return res?.taskTypes || null;
};

export const getHousingManagements = async (): Promise<
  GuidStringDictionaryItem[] | null
> => {
  const res = await axios.get<void, BuildingFiltersResponse>(
    'Buildings/filters',
  );
  return res?.houseManagements;
};

export const getPerpetratorIds =
  (): Promise<OrganizationUserListResponsePagedList> =>
    axios.get('OrganizationUsers');
