import { CheckDeviceRequest } from 'myApi';

export type CheckCalculatorFormik = Omit<CheckDeviceRequest, 'deviceId'>;
