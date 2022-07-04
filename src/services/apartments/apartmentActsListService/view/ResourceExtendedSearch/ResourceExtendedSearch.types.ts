import { EActResourceType, EActResourceTypeStringDictionaryItem } from 'myApi';

export type ResourceExtendedSearchProps = {
  handleUpdateResources: (resources: EActResourceType[]) => void;
};

export type ResourcesFilter = {
  allowedActResources: EActResourceType[];
};
