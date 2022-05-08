import { PipeNodeResponse } from 'myApi';

export type NodeInfoProps = {
  node: PipeNodeResponse | null;
  loading: boolean;
};
