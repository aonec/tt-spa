import { CloseDeviceRequest } from 'myApi';

export type CloseCalculatorFormik = Omit<CloseDeviceRequest, 'deviceId'>;
