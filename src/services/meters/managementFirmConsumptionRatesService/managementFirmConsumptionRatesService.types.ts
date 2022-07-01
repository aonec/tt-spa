import { EResourceType } from 'myApi';
import {
  ConsumptionRateResponse,
  EResourceTypeConsumptionRateResponseDictionaryItem,
} from 'myApi';

export type MangingFirmsConsumptionRatesDictionary = {
  [
    managementFirmId: number
  ]: EResourceTypeConsumptionRateResponseDictionaryItem[];
};

export type ConsumptionRatesDictionary = {
  [resourceType in keyof typeof EResourceType]: ConsumptionRateResponse | null;
};
