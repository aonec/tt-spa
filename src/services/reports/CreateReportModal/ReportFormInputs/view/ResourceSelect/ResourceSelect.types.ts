import { EResourceType } from 'api/myApi';

export type ResourceSelectProps = {
  onChange: (resources: EResourceType[]) => void;
  resources: EResourceType[];
};
