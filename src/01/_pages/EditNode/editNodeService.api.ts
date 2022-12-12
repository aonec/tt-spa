import { axios } from '01/axios';
import { EMagistralTypeStringDictionaryItem, EResourceType } from 'myApi';

export const fetchPipeNodeMagistrals = (
  resource: EResourceType
): Promise<EMagistralTypeStringDictionaryItem[]> =>
  axios.get('PipeNodes/PipeMagistralTypes', { params: { resource } });
