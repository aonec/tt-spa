import { NodeServiceZoneResponse, PipeNodeResponse } from 'myApi';

export type EditNodeCommonInfoProps = {
  node: PipeNodeResponse;
  openAddNewZonesModal: () => void;
  nodeZones: NodeServiceZoneResponse[];

};
