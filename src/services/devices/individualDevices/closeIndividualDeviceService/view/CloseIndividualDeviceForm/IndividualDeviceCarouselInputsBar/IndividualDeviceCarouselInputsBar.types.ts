import {
  EIndividualDeviceRateType,
  EResourceType,
  IndividualDeviceListItemResponse,
} from 'api/types';
import { PreparedForFormReadings } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.types';

export type IndividualDeviceCarouselInputsBarProps = {
  model: string;
  serialNumber: string;
  title: string;
  resource: EResourceType | null;
  rateType: EIndividualDeviceRateType;
  readings: {
    [key: number]: PreparedForFormReadings;
  };
  device: IndividualDeviceListItemResponse | null;
  onChange?: (readings: { [key: number]: PreparedForFormReadings }) => void;
  disabled?: boolean;
};
