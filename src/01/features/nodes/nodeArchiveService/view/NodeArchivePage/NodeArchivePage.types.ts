import { PipeNodeResponse } from '../../api/types';

export type NodeArchivePageProps = {
  node: PipeNodeResponse | null;
  loading: boolean
};
