import { PipeNodeResponse } from 'api/types';

export type NodeConnectionProps = {
  node: PipeNodeResponse;
  onEdit?: () => void;
  onRemoveConnection?(): void;
};
