import { CloseDeviceRequest } from 'api/myApi';

export type CloseCalculatorFormik = Omit<CloseDeviceRequest, 'deviceId'>;
