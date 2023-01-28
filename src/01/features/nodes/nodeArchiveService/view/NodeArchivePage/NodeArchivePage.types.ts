import { PipeNodeResponse } from 'myApi';

export type NodeArchivePageProps = {
  node: PipeNodeResponse | null;
  loading: boolean
};
