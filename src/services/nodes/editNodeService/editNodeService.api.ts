import { axios } from 'api/axios';
import {
  NodeServiceZoneListResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'api/types';

export const fetchNode = (nodeId: string): Promise<PipeNodeResponse> =>
  axios.get(`PipeNodes/${nodeId}`);

export const fetchServiceZones = (): Promise<NodeServiceZoneListResponse> =>
  axios.get('NodeServiceZones');

export const fetchUpdateNode = ({
  pipeNodeId,
  payload,
}: {
  pipeNodeId: string;
  payload: UpdatePipeNodeRequest;
}): Promise<void> => axios.put(`PipeNodes/${pipeNodeId}`, payload);
