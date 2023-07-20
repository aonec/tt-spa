import { CloseDeviceRequest } from 'api/myApi';

export type CloseHousingMeteringDeviceFormProps = {
  deviceId: number;
  handleOnSubmit: (payload: CloseDeviceRequest) => void;
  formId: string;
};
