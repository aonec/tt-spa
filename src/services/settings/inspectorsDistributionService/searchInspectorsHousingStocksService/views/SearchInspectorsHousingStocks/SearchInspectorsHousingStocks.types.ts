import { GuidStringDictionaryItem, InspectorResponse } from 'api/types';
import { FormType } from '../../searchInspectorsHousingStocks.types';

export type SearchInspectorsHousingStocksProps = {
  isExtendedSearchOpen: boolean;
  handelExtendedSearchOpen: () => void;
  handleExtendedSearchClose: () => void;
  inspectors: InspectorResponse[] | null;
  hosuingManagements?: GuidStringDictionaryItem[] | null;
  handleApplyFilters: () => void;
  handleClearExtendedSearchValues: () => void;
  isSearchError: boolean;
  initialCity: string;
  handleSearchInspector: () => void;
  setForm: (payload: FormType) => void;
};
