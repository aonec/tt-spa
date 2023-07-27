import { EResourceType } from 'api/types';

export type SelectResourcePanelProps = {
  resource: EResourceType;
  active: boolean;
  setResource: (resource: EResourceType) => void;
  summary: number | null;
  isSummaryLoading: boolean;
};
