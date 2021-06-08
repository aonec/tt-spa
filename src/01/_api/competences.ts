import axios from '01/axios';
import { ECompetenceTypeStringDictionaryItem } from './../../myApi';

export const getCompetencesCatalog = (): Promise<
  ECompetenceTypeStringDictionaryItem[] | null
> => axios.get('ManagementFirmCompetences/Catalog');
