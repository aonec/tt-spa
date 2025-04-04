import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { CalculatorResponse, PingDeviceResponse } from 'api/types';

export const pingCalculatorQuery = createQuery<[number], PingDeviceResponse>({
  handler: (deviceId) => axios.get(`/Calculators/pingdevice/${deviceId}`),
});

export const calculatorQuery = createQuery<[number], CalculatorResponse>({
  handler: (deviceId) => axios.get(`/Calculators/${deviceId}`),
});
