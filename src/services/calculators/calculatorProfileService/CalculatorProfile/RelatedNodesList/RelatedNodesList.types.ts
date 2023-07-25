import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
} from 'api/types';

export type RelatedNodesListProps = {
  nodes: PipeNodeIntoCalculatorResponse[] | null;
  openDevicesListModal: (
    payload: PipeNodeIntoCalculatorResponse | NodeOnHousingStockResponse,
  ) => void;
};
