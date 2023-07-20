import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
} from 'api/myApi';

export type PipeNodeInfoProps = {
  pipeNode: NodeOnHousingStockResponse | PipeNodeIntoCalculatorResponse;
};
