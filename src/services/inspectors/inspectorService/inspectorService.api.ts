import { axios } from 'api/axios';
import { InspectorResponse } from 'api/types';

export const getInspector = (id: number): Promise<InspectorResponse> =>
  axios.get(`Inspectors/${id}`);
