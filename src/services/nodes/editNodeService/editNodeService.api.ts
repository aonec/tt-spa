import { axios } from 'api/axios';
import {
  NodeServiceZoneListResponse,
  NodeServiceZoneWithNodeCountResponse,
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

export const deleteNodeServiceZone = (
  nodeServiceZoneId: number,
): Promise<void> => axios.delete(`NodeServiceZones/${nodeServiceZoneId}`);

export const getNodeServiceZone = (
  nodeServiceZoneId: number,
): Promise<NodeServiceZoneWithNodeCountResponse> =>
  axios.get(`NodeServiceZones/${nodeServiceZoneId}`);
