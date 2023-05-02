import axios from '01/axios';
import {
  AddApartmentActRequest,
  EActResourceTypeStringDictionaryItem,
  EActTypeStringDictionaryItem,
} from 'myApi';

export const getApartmentActTypes = (): Promise<
  EActTypeStringDictionaryItem[] | null
> => axios.get('ApartmentActs/ActTypes');

export const getActResources = (): Promise<
  EActResourceTypeStringDictionaryItem[] | null
> => axios.get('ApartmentActs/ActResourceTypes');

export const addApartmentActs = (
  payload: AddApartmentActRequest,
): Promise<void> => axios.post('ApartmentActs', payload);
