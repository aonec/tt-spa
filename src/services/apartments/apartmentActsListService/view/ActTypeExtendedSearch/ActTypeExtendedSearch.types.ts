import { EActType, EActTypeStringDictionaryItem } from 'myApi';

export type ActTypeExtendedSearchProps = {
  actTypes: EActTypeStringDictionaryItem[] | null;
  handleUpdateTypes: (types: EActType[]) => void;
};

export type TypesFilter = {
  allowedActTypes: EActType[];
};
