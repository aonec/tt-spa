import { axios } from '01/axios';
import {
  EMagistralTypeStringDictionaryItem,
  EResourceType,
  NodeServiceZoneListResponse,
  PipeNodeResponse,
} from 'myApi';

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

export const fetchPipeNodeMagistrals = (
  resource: EResourceType
): Promise<EMagistralTypeStringDictionaryItem[]> =>
  axios.get('PipeNodes/PipeMagistralTypes', { params: { resource } });
