import axios from '01/axios';
import { MayBe } from '01/features/actsJournal/displayActsJournal/models';
import {
  EActResourceTypeStringDictionaryItem,
  EActTypeStringDictionaryItem,
} from 'myApi';

export const getApartmentActTypes = (): Promise<
  MayBe<EActTypeStringDictionaryItem[]>
> => axios.get('ApartmentActs/ActTypes');

export const getActResources = (): Promise<
  MayBe<EActResourceTypeStringDictionaryItem[]>
> => axios.get('ApartmentActs/ActResourceTypes');

