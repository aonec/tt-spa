import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
} from 'api/types';

export type PipeNodeInfoProps = {
  pipeNode: NodeOnHousingStockResponse | PipeNodeIntoCalculatorResponse;
};
