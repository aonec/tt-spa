import { Result } from 'effector-forms';
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
  form: Result<{
    City: string;
    Street: string;
    BuildingNumber: string;
    HouseManagement: string;
    InspectorId: string;
  }>;
  isSearchError: boolean;
};
