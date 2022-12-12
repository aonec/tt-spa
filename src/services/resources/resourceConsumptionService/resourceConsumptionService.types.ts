import { DateTimeDoubleDictionaryItem, EResourceType } from 'myApi';

export type HousingConsumptionDataForTwoMonth = {
  currentMonthData: DateTimeDoubleDictionaryItem[];
  prevMonthData: DateTimeDoubleDictionaryItem[];
};

export type HousingConsumptionDataFilter = {
  HousingStockId: number;
  ResourceType: EResourceType;
  From: string;
  To: string;
};

export type GetHousingConsumptionDataFilter = {
  HousingStockId: number;
  From: string;
};

export type AddressWithSearchString = {
  id: number;
  addressString: string;
};

export type PreparedHouseManagements = {
  id: string;
  name: string | null;
};
