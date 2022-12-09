import { DateTimeDoubleDictionaryItem, EResourceType } from 'myApi';

export type HousingConsumptionDataForTwoMonth = {
  currentMonthData: MonthConsumptionData;
  prevMonthData: MonthConsumptionData;
};

export type MonthConsumptionData = {
  [ResourceConsumptionGraphType.Housing]: DateTimeDoubleDictionaryItem[];
  [ResourceConsumptionGraphType.Normative]: DateTimeDoubleDictionaryItem[];
  [ResourceConsumptionGraphType.Subscriber]: DateTimeDoubleDictionaryItem[];
};

export enum ResourceConsumptionGraphType {
  Housing = 'housing',
  Normative = 'normative',
  Subscriber = 'subscriber',
}

export type ConsumptionDataFilter = {
  HousingStockId: number;
  ResourceType: EResourceType;
  From: string;
  To: string;
};

export type GetConsumptionDataFilter = {
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
