import {
  ApartmentResponse,
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceResponse,
} from 'api/types';
import { RequestStatusShared } from '../../readingsHistoryListService.types';
import { ConsumptionRatesDictionary } from 'services/meters/managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';

export type ReadingsHistoryListProps = {
  readonly: boolean;
  device: IndividualDeviceResponse | null;
  apartment: ApartmentResponse | null;
  readingsHistory: IndividualDeviceReadingsHistoryResponse | null;
  setFieldValue: (
    value: string,
    address: {
      year: number;
      month: number;
      id: number | null;
      index: number;
    },
  ) => void;
  uploadingReadingsStatuses: {
    [date: string]: RequestStatusShared;
  };
  uploadReading: (
    reading: IndividualDeviceReadingsCreateRequest,
  ) => Promise<void>;
  deleteReading: (id: number) => Promise<void>;
  resetValue: (address: {
    year: number;
    month: number;
    id: number | null;
  }) => void;
  pendingHistory: boolean;
  rateNum: number | null;
  managementFirmConsumptionRates: ConsumptionRatesDictionary | null;
  isYearOpen: (year: number) => boolean | undefined;
  openYear: (year: number) => void;
  closeYear: (year: number) => void;
  openMonth: (year: number, month: number) => void;
  closeMonth: (year: number, month: number) => void;
  isMonthOpen: (year: number, month: number) => boolean;
  isModal: boolean;
};
