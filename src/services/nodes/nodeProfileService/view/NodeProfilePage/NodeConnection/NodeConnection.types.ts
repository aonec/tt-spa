import { PipeNodeResponse } from 'api/myApi';

export type NodeConnectionProps = {
  node: PipeNodeResponse;
  onEdit?: () => void;
  onRemoveConnection?(): void;
};
