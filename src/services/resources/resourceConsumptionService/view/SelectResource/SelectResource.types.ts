import { EResourceType } from 'myApi';

export type SelectResourceProps = {
  selectedResource: EResourceType | null;
  setResource: (resource: EResourceType) => void;
};
