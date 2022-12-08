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

export type GetHousingConsumptionDataFormik = Omit<
  HousingConsumptionDataFilter,
  'ResourceType' | 'To'
>;

export type AddressWithSearchString = {
  id: number;
  addressString: string;
};

export type PreparedHouseManagements = {
  id: string;
  name: string | null;
};
