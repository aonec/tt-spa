import { EResourceType } from 'api/types';
import { CancelTokenSource } from 'axios';

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
  [ResourceConsumptionGraphDataType.currentMonthData]?: MonthConsumptionData;
  [ResourceConsumptionGraphDataType.prevMonthData]?: MonthConsumptionData;
  [ResourceConsumptionGraphDataType.additionalAddress]?: MonthConsumptionData;
};

export enum ResourceConsumptionGraphType {
  Housing = 'housing',
  Normative = 'normative',
  Subscriber = 'subscriber',
}

export type MonthConsumptionData = {
  [ResourceConsumptionGraphType.Housing]?: ResourceConsumptionWithNull[];
  [ResourceConsumptionGraphType.Normative]?: ResourceConsumptionWithNull[];
  [ResourceConsumptionGraphType.Subscriber]?: ResourceConsumptionWithNull[];
};

export type AllConsumptionDataWithNullableAdditionalAddress = {
  [ResourceConsumptionGraphDataType.currentMonthData]?: MonthConsumptionData;
  [ResourceConsumptionGraphDataType.prevMonthData]?: MonthConsumptionData;
  [ResourceConsumptionGraphDataType.additionalAddress]: MonthConsumptionData | null;
};

export type ConsumptionRequestPayload = {
  params: ConsumptionDataPayload;
  token: CancelTokenSource;
};

export type ConsumptionDataPayload = {
  ResourceType: EResourceType;
  BuildingIds: number[];
  AdditionalHousingStockIds: number[];
  From: string;
  To: string;
};

export type AddressWithSearchString = {
  id: number;
  addressString: string;
};

export type PreparedHouseManagements = {
  id: string;
  name: string | null;
};

export type SetConsumptionDataType = {
  housing?: ResourceConsumptionWithNull[];
  normative?: ResourceConsumptionWithNull[];
  subscriber?: ResourceConsumptionWithNull[];
};

export enum ResourceConsumptionCancelToken {
  summary = 'summary',
  currentMonthData = 'currentMonthData',
  prevMonthData = 'prevMonthData',
  additionalAddress = 'additionalAddress',
}

export type CancelTokens = {
  [key in ResourceConsumptionCancelToken]?: CancelTokenSource;
};
