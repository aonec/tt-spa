import { InspectorResponse } from './../../myApi';
import axios from '01/axios';

export const getInspector = (id: number): Promise<InspectorResponse> =>
  axios.get(`Inspectors/${id}`);
