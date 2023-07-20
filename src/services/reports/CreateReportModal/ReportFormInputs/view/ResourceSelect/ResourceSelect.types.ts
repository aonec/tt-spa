import { EResourceType } from 'api/types';

export type ResourceSelectProps = {
  onChange: (resources: EResourceType[]) => void;
  resources: EResourceType[];
};
