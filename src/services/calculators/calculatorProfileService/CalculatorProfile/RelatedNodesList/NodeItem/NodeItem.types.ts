import { PipeNodeIntoCalculatorResponse } from 'myApi';

export type NodeItemProps = {
  node: PipeNodeIntoCalculatorResponse;
  openDevicesListModal: (payload: PipeNodeIntoCalculatorResponse) => void;
};
