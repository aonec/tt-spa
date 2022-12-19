import { PipeNodeResponse } from 'myApi';

export type NodeProfilePageProps = {
  pipeNode: PipeNodeResponse | null;
  isLoading: boolean;
  section?: PipeNodeProfileSection;
  handleChangeTab: (section: PipeNodeProfileSection) => void;
};

export enum PipeNodeProfileSection {
  Common = 'common',
  Stats = 'stats',
  Connection = 'connection',
  Readings = 'readings',
  Related = 'related',
  Documents = 'documents',
  Checks = 'checks',
}
