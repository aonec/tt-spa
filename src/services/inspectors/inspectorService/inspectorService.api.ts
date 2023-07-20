import { axios } from 'api/axios';
import { InspectorResponse } from 'api/myApi';

export const getInspector = (id: number): Promise<InspectorResponse> =>
  axios.get(`Inspectors/${id}`);
