import { GuidStringDictionaryItem, InspectorResponse } from '../../api/types';

export type SearchInspectorsHousingStocksProps = {
  form: any;
  cities: string[] | null;
  existingStreets: string[] | null;
  isExtendedSearchOpen: boolean;
  handelExtendedSearchOpen: () => void;
  handleExtendedSearchClose: () => void;
  inspectors: InspectorResponse[] | null;
  hosuingManagements?: GuidStringDictionaryItem[] | null;
  handleSearch: () => void;
  handleApplyFilters: () => void;
  handleClearExtendedSearchValues: () => void;
};
