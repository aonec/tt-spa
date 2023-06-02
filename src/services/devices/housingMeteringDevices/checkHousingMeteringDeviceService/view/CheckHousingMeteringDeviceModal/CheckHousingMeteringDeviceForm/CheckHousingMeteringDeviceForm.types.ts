import { CheckDeviceRequest } from 'myApi';

export type CheckHousingMeteringDeviceFormProps = {
  deviceId: number;
  formId: string;
  handleOnSubmit: (payload: CheckDeviceRequest) => void;
};

export type CheckHousingMeteringDeviceFormTypes = {
  deviceId: number;
  lastCheckingDate: moment.Moment | null;
  futureCheckingDate: moment.Moment | null;
};
