import { InspectorResponse } from '../../api/types';
import axios from '../../api/axios';

export const getInspector = (id: number): Promise<InspectorResponse> =>
  axios.get(`Inspectors/${id}`);
