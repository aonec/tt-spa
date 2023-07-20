import { PipeNodeResponse } from 'api/myApi';

export type NodeArchivePageProps = {
  node: PipeNodeResponse | null;
  loading: boolean;
};
