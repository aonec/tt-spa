import {
  EClosingReason,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsSlimResponse,
} from 'api/types';
import dayjs, { Dayjs } from 'dayjs';
import { PreparedForFormReadings } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.types';

export type CloseIndividualDeviceFormProps = {
  formId: string;
  device: IndividualDeviceListItemResponse | null;
  lastReading: IndividualDeviceReadingsSlimResponse | null;
  isBannerShown: boolean;
  openReadingsHistoryModal: (payload: number) => void;
  handleSubmitForm: (payload: CloseIndividualDeviceFormType) => void;
  handleSetClosingDate: (payload: Dayjs) => void;
};

export type CloseIndividualDeviceFormType = {
  closingDate: dayjs.Dayjs;
  closingReason: EClosingReason | null;
  deviceReadings: {
    [key: number]: PreparedForFormReadings;
  };
};
