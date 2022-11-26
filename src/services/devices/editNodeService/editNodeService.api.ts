import { axios } from '01/axios';
import { NodeServiceZoneListResponse, PipeNodeResponse } from 'myApi';

export const fetchNode = (nodeId: string): Promise<PipeNodeResponse> =>
  axios.get(`PipeNodes/${nodeId}`);

export const fetchServiceZones = (): Promise<NodeServiceZoneListResponse> =>
  axios.get('NodeServiceZones');

export const updateDocuments = ({
  nodeId,
  documentsIds,
}: {
  nodeId: number;
  documentsIds: number[];
}): Promise<void> => axios.post(`Nodes/${nodeId}/Documents`, { documentsIds });
