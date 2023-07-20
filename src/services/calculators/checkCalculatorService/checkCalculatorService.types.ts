import { CheckDeviceRequest } from 'api/myApi';

export type CheckCalculatorFormik = Omit<CheckDeviceRequest, 'deviceId'>;
