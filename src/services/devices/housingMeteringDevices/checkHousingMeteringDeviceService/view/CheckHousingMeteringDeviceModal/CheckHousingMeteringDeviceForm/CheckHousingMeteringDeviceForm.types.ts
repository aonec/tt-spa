import { CheckDeviceRequest } from 'api/types';
import dayjs from 'api/dayjs';

export type CheckHousingMeteringDeviceFormProps = {
  deviceId: number;
  formId: string;
  handleOnSubmit: (payload: CheckDeviceRequest) => void;
};

export type CheckHousingMeteringDeviceFormTypes = {
  deviceId: number;
  lastCheckingDate: dayjs.Dayjs | null;
  futureCheckingDate: dayjs.Dayjs | null;
};
