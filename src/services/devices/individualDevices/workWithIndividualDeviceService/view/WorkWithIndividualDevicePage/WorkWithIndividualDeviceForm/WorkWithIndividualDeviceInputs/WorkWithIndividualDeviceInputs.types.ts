import { EIndividualDeviceRateType, EResourceType } from 'myApi';
import { PreparedForFormReadings } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.types';

export type WorkWithIndividualDeviceInputsProps = {
  model: string;
  serialNumber: string;
  title: string;
  resource: EResourceType | null;
  rateType: EIndividualDeviceRateType;
  readings: {
    [key: number]: PreparedForFormReadings;
  };
  onChange: (readings: { [key: number]: PreparedForFormReadings }) => void;
};
