import { axios } from '01/axios';
import { InspectorResponse } from 'myApi';

export const getInspectors = (): Promise<InspectorResponse[] | null> =>
  axios.get('Inspectors');
