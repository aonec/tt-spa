import { NodeArchivePreparedData } from '../../displayNodeArchiveService.types';

export type NodeArchiveListProps = {
  data: NodeArchivePreparedData | null;
  withFaultReadings: boolean;
  setWithFaultReadings: (withFaultReadings: boolean) => void;
};
