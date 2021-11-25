import axios from '01/axios';
import { MayBe } from '01/features/actsJournal/displayActsJournal/models';
import { EActTypeStringDictionaryItem } from 'myApi';

export const getApartmentSctTypes = async (): Promise<
  MayBe<EActTypeStringDictionaryItem[]>
> => axios.get('ApartmentActs/ActTypes');
