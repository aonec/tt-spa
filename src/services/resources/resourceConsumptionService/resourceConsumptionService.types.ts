import { EResourceType } from 'myApi';

export type ConsumptionDataForTwoMonth = {
  [ResourceConsumptionGraphMonth.currentMonthData]: MonthConsumptionData;
  [ResourceConsumptionGraphMonth.prevMonthData]: MonthConsumptionData;
};

export type MonthConsumptionData = {
  [ResourceConsumptionGraphType.Housing]: ResourceConsumptionWithNull[];
  [ResourceConsumptionGraphType.Normative]: ResourceConsumptionWithNull[];
  [ResourceConsumptionGraphType.Subscriber]: ResourceConsumptionWithNull[];
};

export type ResourceConsumptionWithNull = {
  value?: number | null;
  key?: string;
};

export enum ResourceConsumptionGraphMonth {
  currentMonthData = 'currentMonthData',
  prevMonthData = 'prevMonthData',
}

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
