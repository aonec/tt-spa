import { EResourceType } from 'myApi';

export type ResourceSelectProps = {
  resource: EResourceType | null;
  exclude?: EResourceType[];
  disabled?: boolean;
  onChange?: (resource: EResourceType | null) => void;
};
