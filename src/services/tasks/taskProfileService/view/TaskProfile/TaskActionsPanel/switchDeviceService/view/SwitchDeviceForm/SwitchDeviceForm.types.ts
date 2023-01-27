import {
  MeteringDeviceResponse,
  SwitchHousingMeteringDeviceRequest,
} from 'myApi';
import { CalculatorInfoItem } from '01/features/carlculators/calculatorsInfo/models/types';

export type SwitchDeviceFormProps = {
  device: MeteringDeviceResponse;
  handleChangeSwitchDevicePayload: (
    payload: Omit<SwitchHousingMeteringDeviceRequest, 'deviceId'>,
  ) => void;
  isCalculator: boolean;
  calculatorInfos: CalculatorInfoItem[];
};

export type SwitchDeviceFormValues = {
  lastCheckingDate: null | moment.Moment;
  futureCheckingDate: null | moment.Moment;
  openingDate: null | moment.Moment;
  model: '';
  serialNumber: '';
  calculatorInfoId: number | null;
};
