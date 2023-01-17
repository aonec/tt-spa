import {
  MeteringDeviceResponse,
  SwitchHousingMeteringDeviceRequest,
} from 'myApi';

export type SwitchDeviceFormProps = {
  device: MeteringDeviceResponse;
  handleChangeSwitchDevicePayload: (
    payload: Omit<SwitchHousingMeteringDeviceRequest, 'deviceId'>
  ) => void;
  isCalculator: boolean;
};

export type SwitchDeviceFormValues = {
  lastCheckingDate: null | moment.Moment;
  futureCheckingDate: null | moment.Moment;
  openingDate: null | moment.Moment;
  model: '';
  serialNumber: '';
};
