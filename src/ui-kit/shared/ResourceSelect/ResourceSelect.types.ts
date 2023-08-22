import { EResourceType } from 'api/types';

export type ResourceSelectProps = {
  resource: EResourceType | null;
  exclude?: EResourceType[];
  disabled?: boolean;
  onChange?: (resource: EResourceType | null) => void;
  small?: boolean;
};
