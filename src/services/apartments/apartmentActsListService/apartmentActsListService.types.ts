import { EActResourceType, EActType } from 'myApi';

export type ActsFilter = {
  actTypes: EActType[];
  resources: EActResourceType[];
};
