import { NodeCheckResponse } from 'api/myApi';

export type NodeChecksProps = {
  documents: NodeCheckResponse[];
  isLoading: boolean;
  openCheckNodeModal(payload: void): void;
  removeNodeCheck(id: number): void;
  openEditNodeCheckModal(payload: NodeCheckResponse): void;
};
