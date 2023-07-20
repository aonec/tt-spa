import { Result } from 'effector-forms';
import { GuidStringDictionaryItem, InspectorResponse } from 'api/myApi';

export type SearchInspectorsHousingStocksProps = {
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
  form: Result<{
    City: string;
    Street: string;
    BuildingNumber: string;
    HouseManagement: string;
    InspectorId: number | null;
  }>;
};
