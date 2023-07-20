import { PipeNodeIntoCalculatorResponse } from 'api/myApi';

export type NodeItemProps = {
  node: PipeNodeIntoCalculatorResponse;
  openDevicesListModal: (payload: PipeNodeIntoCalculatorResponse) => void;
};
