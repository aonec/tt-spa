import { GuidStringDictionaryItem, InspectorResponse } from 'api/types';

export type SearchInspectorsHousingStocksProps = {
  isExtendedSearchOpen: boolean;
  handelExtendedSearchOpen: () => void;
  handleExtendedSearchClose: () => void;
  inspectors: InspectorResponse[] | null;
  hosuingManagements?: GuidStringDictionaryItem[] | null;
  handleSearch: () => void;
  handleApplyFilters: () => void;
  handleClearExtendedSearchValues: () => void;
  isSearchError: boolean;
};
