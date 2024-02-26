import { axios } from 'api/axios';
import { InspectorCreateRequest, InspectorResponse } from 'api/types';

export const addInspector = (
  payload: InspectorCreateRequest,
): Promise<InspectorResponse> => axios.post('Inspectors', payload);
