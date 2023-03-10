import { EResourceType } from 'myApi';

export type ResourceConsumptionWithNull = {
  value?: number | null;
  key?: string;
};

export enum ResourceConsumptionGraphDataType {
  currentMonthData = 'currentMonthData',
  prevMonthData = 'prevMonthData',
  additionalAddress = 'additionalAddress',
}

export type ConsumptionDataForTwoMonth = {
  [ResourceConsumptionGraphDataType.currentMonthData]: MonthConsumptionData;
  [ResourceConsumptionGraphDataType.prevMonthData]: MonthConsumptionData;
};

export enum ResourceConsumptionGraphType {
  Housing = 'housing',
  Normative = 'normative',
  Subscriber = 'subscriber',
}

export type MonthConsumptionData = {
  [ResourceConsumptionGraphType.Housing]: ResourceConsumptionWithNull[];
  [ResourceConsumptionGraphType.Normative]: ResourceConsumptionWithNull[];
  [ResourceConsumptionGraphType.Subscriber]: ResourceConsumptionWithNull[];
};

export type ConsumptionDataFilter = GetConsumptionDataFilter & {
  ResourceType: EResourceType;
  To: string;
};

export type GetConsumptionDataFilter = {
  HousingStockIds: number[];
  currentAddress: string | null;
  additionalAddress: string | null;
  AdditionalHousingStockId: number | null;
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
