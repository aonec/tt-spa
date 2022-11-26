import {
  EMagistralTypeStringDictionaryItem,
  NodeServiceZoneResponse,
  PipeNodeResponse,
} from 'myApi';
import { NodeEditGrouptype } from '../../editNodeService.constants';

export type EditNodePageProps = {
  node: PipeNodeResponse;
  setGrouptype: (grouptype: NodeEditGrouptype) => void;
  grouptype: NodeEditGrouptype;
  openAddNewZonesModal: () => void;
  nodeZones: NodeServiceZoneResponse[];
  magistrals: EMagistralTypeStringDictionaryItem[];
  refetchNode: () => void;
};
