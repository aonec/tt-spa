import { EActResourceType, EActType } from 'api/myApi';

export type ActsFilter = {
  actTypes: EActType[];
  resources: EActResourceType[];
};
