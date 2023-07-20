import { CheckDeviceRequest } from 'api/types';

export type CheckCalculatorFormik = Omit<CheckDeviceRequest, 'deviceId'>;
