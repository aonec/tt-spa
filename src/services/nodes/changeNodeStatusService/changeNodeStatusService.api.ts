import { axios } from 'api/axios';
import { ChangeNodeStatusPayload } from './changeNodeStatusService.types';

export const fetchChangeCommercialStatus = ({
  nodeId,
  ...payload
}: ChangeNodeStatusPayload): Promise<void> =>
  axios.post(`PipeNodes/${nodeId}/SetCommercialStatus`, payload);
