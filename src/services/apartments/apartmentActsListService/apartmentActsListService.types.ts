import { EActResourceType, EActType } from '../../api/types';

export type ActsFilter = {
  actTypes:  EActType[];
  resources: EActResourceType[];
};

