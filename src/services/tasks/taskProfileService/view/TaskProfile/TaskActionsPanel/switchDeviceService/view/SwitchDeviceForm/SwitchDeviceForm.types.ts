import {
  MeteringDeviceResponse,
  PipeHousingMeteringDeviceResponse,
} from 'myApi';

export type SwitchDeviceFormProps = {
  device: MeteringDeviceResponse;
  devicePipe: PipeHousingMeteringDeviceResponse | null;
};
