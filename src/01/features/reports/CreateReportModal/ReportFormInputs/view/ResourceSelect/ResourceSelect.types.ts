import { EResourceType } from 'myApi';

export type ResourceSelectProps = {
  onChange: (resources: EResourceType[]) => void;
};
