import { EResourceType } from 'api/myApi';
import {
  ConsumptionRateResponse,
  EResourceTypeConsumptionRateResponseDictionaryItem,
} from 'api/myApi';

export type MangingFirmsConsumptionRatesDictionary = {
  [managementFirmId: number]:
    | EResourceTypeConsumptionRateResponseDictionaryItem[]
    | null;
};

export type ConsumptionRatesDictionary = {
  [resourceType in keyof typeof EResourceType]: ConsumptionRateResponse | null;
};
