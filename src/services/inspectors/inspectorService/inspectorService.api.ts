import { axios } from '01/axios';
import { InspectorResponse } from 'myApi';

export const getInspector = (id: number): Promise<InspectorResponse> =>
  axios.get(`Inspectors/${id}`);
