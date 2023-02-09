import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
} from 'myApi';

export type RelatedNodesListProps = {
  nodes: PipeNodeIntoCalculatorResponse[] | null;
  openDevicesListModal: (
    payload: PipeNodeIntoCalculatorResponse | NodeOnHousingStockResponse,
  ) => void;
};
