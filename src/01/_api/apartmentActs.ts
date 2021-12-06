import axios from '01/axios';
import {
  ApartmentActPaginationParameters,
  MayBe,
} from '01/features/actsJournal/displayActsJournal/models';
import { formQueryString } from '01/utils/formQueryString';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
  EActResourceTypeStringDictionaryItem,
  EActTypeStringDictionaryItem,
} from 'myApi';

export const getApartmentActTypes = (): Promise<
  MayBe<EActTypeStringDictionaryItem[]>
> => axios.get('ApartmentActs/ActTypes');

export const getActResources = (): Promise<
  MayBe<EActResourceTypeStringDictionaryItem[]>
> => axios.get('ApartmentActs/ActResourceTypes');

export const getApartmentActs = async (
  params: ApartmentActPaginationParameters
): Promise<ApartmentActResponsePagedList | null> => {
  const res: ApartmentActResponsePagedList = await axios.get(
    `ApartmentActs${formQueryString(params)}`
  );

  return res;
};

export const addApartmentActs = (
  payload: AddApartmentActRequest
): Promise<void> => axios.post('ApartmentActs', payload);
