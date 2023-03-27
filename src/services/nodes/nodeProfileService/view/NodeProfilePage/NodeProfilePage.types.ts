import { PipeNodeResponse } from 'myApi';

export type NodeProfilePageProps = {
  pipeNode: PipeNodeResponse | null;
  isLoading: boolean;
  section?: PipeNodeProfileSection;
  handleChangeTab: (section: PipeNodeProfileSection) => void;
  handleEditNode: () => void;
  openChangeNodeStatusModal: (node: PipeNodeResponse) => void;
  openChangeNodeTypeModal: (node: PipeNodeResponse) => void;
  isPermitionToEditsNode: boolean;
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
