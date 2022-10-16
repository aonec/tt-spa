import {
  MeteringDeviceResponse,
  PipeHousingMeteringDeviceResponse,
  SwitchHousingMeteringDeviceRequest,
} from 'myApi';

export type SwitchDeviceFormProps = {
  device: MeteringDeviceResponse;
  devicePipe: PipeHousingMeteringDeviceResponse | null;
  handleChangeSwitchDevicePayload: (
    payload: Omit<SwitchHousingMeteringDeviceRequest, 'deviceId'>
  ) => void;
};

export type SwitchDeviceFormValues = {
  lastCheckingDate: null | moment.Moment;
  futureCheckingDate: null | moment.Moment;
  openingDate: null | moment.Moment;
  model: '';
  serialNumber: '';
};
