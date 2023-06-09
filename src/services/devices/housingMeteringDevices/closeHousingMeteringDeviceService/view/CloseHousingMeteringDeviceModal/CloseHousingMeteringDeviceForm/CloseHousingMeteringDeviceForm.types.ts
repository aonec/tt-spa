import { CloseDeviceRequest } from 'myApi';

export type CloseHousingMeteringDeviceFormProps = {
  deviceId: number;
  handleOnSubmit: (payload: CloseDeviceRequest) => void;
  formId: string;
};
