import { GuidStringDictionaryItem, HousingStockListResponse } from 'myApi';

export type ManagingFirmSearchProps = {
  cities: string[];
  managingFirms: GuidStringDictionaryItem[];
  selectManagingFirm: (managingFirm: string) => void;
  selectedManagingFirm: string;
};
