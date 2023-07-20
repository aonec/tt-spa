import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
} from 'api/myApi';

export type RelatedNodesListProps = {
  nodes: PipeNodeIntoCalculatorResponse[] | null;
  openDevicesListModal: (
    payload: PipeNodeIntoCalculatorResponse | NodeOnHousingStockResponse,
  ) => void;
};
