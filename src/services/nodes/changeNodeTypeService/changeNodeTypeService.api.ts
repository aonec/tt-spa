import { axios } from 'api/axios';
import { ChangeNodeTypePayload } from './changeNodeTypeService.types';

export const fetchChangeNodeType = ({
  nodeId,
  ...payload
}: ChangeNodeTypePayload): Promise<void> =>
  axios.post(`PipeNodes/${nodeId}/SetRegistrationType`, payload);
