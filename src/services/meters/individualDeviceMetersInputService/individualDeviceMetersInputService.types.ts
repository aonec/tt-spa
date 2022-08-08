import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import { ConsumptionRatesDictionary } from '../managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';

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

export type CompareReadingsResult = {
  valueIndex: number;
  diff?: number;
  result: CompareReadingsStatus;
};

export enum CompareReadingsStatus {
  LeftGreater = 'LeftGreater',
  RightLess = 'RightLess',
  Ok = 'Ok',
}

export type MeterInputUploadReadingPayload = Omit<
  IndividualDeviceReadingsCreateRequest,
  'deviceId'
>;

export type UploadReading = (
  readingPayload: MeterInputUploadReadingPayload,
  isPrevious?: boolean
) => Promise<void>;
