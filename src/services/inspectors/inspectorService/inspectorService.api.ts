import { axios } from 'api/axios';
import { InspectorResponse } from 'myApi';

export const getInspector = (id: number): Promise<InspectorResponse> =>
  axios.get(`Inspectors/${id}`);
