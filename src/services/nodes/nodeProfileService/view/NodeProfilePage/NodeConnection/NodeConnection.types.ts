import { PipeNodeResponse } from 'myApi';

export type NodeConnectionProps = {
  node: PipeNodeResponse;
  onEdit?: () => void;
  onRemoveConnection?(): void;
};
