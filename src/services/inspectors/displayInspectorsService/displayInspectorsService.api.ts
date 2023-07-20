import { axios } from 'api/axios';
import { InspectorResponse } from 'myApi';

export const getInspectors = (): Promise<InspectorResponse[] | null> =>
  axios.get('Inspectors');
