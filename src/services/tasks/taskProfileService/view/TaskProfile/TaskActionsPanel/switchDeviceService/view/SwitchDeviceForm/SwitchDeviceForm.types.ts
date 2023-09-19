import {
  MeteringDeviceResponse,
  SwitchHousingMeteringDeviceRequest,
} from 'api/types';
import dayjs from 'dayjs';
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
  lastCheckingDate: null | dayjs.Dayjs;
  futureCheckingDate: null | dayjs.Dayjs;
  openingDate: null | dayjs.Dayjs;
  model: '';
  serialNumber: '';
  calculatorInfoId: number | null;
};
