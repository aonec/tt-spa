import { GuidStringDictionaryItem, HousingStockListResponse } from 'myApi';

export type ManagingFirmSearchProps = {
  cities: string[];
  selectedCity: string;
  selectCity: (city: string) => void;
  managingFirms: GuidStringDictionaryItem[];
  selectManagingFirm: (managingFirm: string) => void;
  selectedManagingFirm: string;
  isOpenExpandedSearch: boolean;
  handleOpenExpandedSearch: () => void;
};
