import { CloseDeviceRequest } from 'api/types';

export type CloseHousingMeteringDeviceFormProps = {
  deviceId: number;
  handleOnSubmit: (payload: CloseDeviceRequest) => void;
  formId: string;
};
