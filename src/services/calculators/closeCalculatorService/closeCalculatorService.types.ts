import { CloseDeviceRequest } from 'api/types';

export type CloseCalculatorFormik = Omit<CloseDeviceRequest, 'deviceId'>;
