import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import { ConsumptionRatesDictionary } from '../managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';
import { MetersInputBlockStatus } from './view/MetersInputsBlock/MetersInputsBlock.types';

export type IndividualDeviceMetersInputContainerProps = {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
  openReadingsHistoryModal: (deviceId: number) => void;
  deviceIndex: number;
  managementFirmConsumptionRates: ConsumptionRatesDictionary | null;
};

export type PreparedReadingsData = {
  [key: number]: IndividualDeviceReadingsResponse;
};

export type ReadingLite = {
  value1: number;
  value2: number | null;
  value3: number | null;
};

export type ValidationReadingsResult = {
  valueIndex: number;
  compareDiff?: number;
  compareStatus?: CompareReadingsStatus;
  limitsConsumptionDiff?: number;
  limit?: number;
};

export enum CompareReadingsStatus {
  LeftGreater = 'LeftGreater',
  RightLess = 'RightLess',
}

export type MeterInputUploadReadingPayload = Omit<
  IndividualDeviceReadingsCreateRequest,
  'deviceId'
> & { sliderIndex: number; meterId?: number };

export type UploadReading = (
  readingPayload: MeterInputUploadReadingPayload,
  next: () => void,
  isPrevious?: boolean
) => Promise<void>;

export type UploadMeterPayload = {
  meter: IndividualDeviceReadingsCreateRequest;
  sliderIndex: number;
  meterId?: number;
};
