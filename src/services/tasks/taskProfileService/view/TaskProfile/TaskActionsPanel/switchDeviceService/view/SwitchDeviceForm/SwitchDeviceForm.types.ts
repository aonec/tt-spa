import {
  MeteringDeviceResponse,
  SwitchHousingMeteringDeviceRequest,
} from 'api/myApi';
import { CalculatorInfoItem } from 'services/calculators/calculatorsInfoService/calculatorsInfoService.types';

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
