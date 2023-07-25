import { PipeNodeIntoCalculatorResponse } from 'api/types';

export type NodeItemProps = {
  node: PipeNodeIntoCalculatorResponse;
  openDevicesListModal: (payload: PipeNodeIntoCalculatorResponse) => void;
};
