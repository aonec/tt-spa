import { EResourceType } from 'myApi';

export type ResourceSelectSCProps = {
  resource: EResourceType | null;
  exclude?: EResourceType[];
  disabled?: boolean;
  onChange?: (resource: EResourceType | null) => void;
};
