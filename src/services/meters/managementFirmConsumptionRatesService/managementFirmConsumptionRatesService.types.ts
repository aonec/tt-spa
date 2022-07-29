import {
  ConsumptionRateResponse,
  EResourceType,
  EResourceTypeConsumptionRateResponseDictionaryItem,
} from "../../../api/types";

export type MangingFirmsConsumptionRatesDictionary = {
  [managementFirmId: number]:
    | EResourceTypeConsumptionRateResponseDictionaryItem[]
    | null;
};

export type ConsumptionRatesDictionary = {
  [resourceType in keyof typeof EResourceType]: ConsumptionRateResponse | null;
};
