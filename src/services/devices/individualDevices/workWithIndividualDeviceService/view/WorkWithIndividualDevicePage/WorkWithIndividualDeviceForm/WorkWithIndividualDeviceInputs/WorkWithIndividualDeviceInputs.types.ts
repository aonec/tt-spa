import { EIndividualDeviceRateType, EResourceType } from 'api/types';
import { PreparedForFormReadings } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.types';

export type WorkWithIndividualDeviceInputsProps = {
  model: string | null;
  serialNumber: string | null;
  title: string;
  resource: EResourceType | null;
  rateType: EIndividualDeviceRateType;
  readings: {
    [key: number]: PreparedForFormReadings;
  };
  onChange?: (readings: { [key: number]: PreparedForFormReadings }) => void;
  disabled?: boolean;
};
