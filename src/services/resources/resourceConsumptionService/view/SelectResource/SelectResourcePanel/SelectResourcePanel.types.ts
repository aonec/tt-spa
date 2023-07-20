import { EResourceType } from 'api/myApi';

export type SelectResourcePanelProps = {
  resource: EResourceType;
  active: boolean;
  setResource: (resource: EResourceType) => void;
  summary: number | null;
};
