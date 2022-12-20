import { EResourceType } from 'myApi';

export type SelectResourcePanelProps = {
  resource: EResourceType;
  active: boolean;
  setResource: (resource: EResourceType) => void;
};
