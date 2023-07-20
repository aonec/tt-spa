import { axios } from 'api/axios';
import { InspectorResponse } from 'api/myApi';

export const getInspectors = (): Promise<InspectorResponse[] | null> =>
  axios.get('Inspectors');
