import { GetProblemDevicesRequestPayload } from './../../../../_api/apartments';
import { createGate } from 'effector-react';
import { IndividualDeviceWithExpiredCheckingDateResponse } from './../../.../../api/types';
import { createEffect, createStore } from 'effector';

export const $problemDevices = createStore<
  IndividualDeviceWithExpiredCheckingDateResponse[] | null
>(null);

export const fetchProblemDevicesFx = createEffect<
  GetProblemDevicesRequestPayload,
  IndividualDeviceWithExpiredCheckingDateResponse[]
>();

export const ProblemDevicesGate = createGate<GetProblemDevicesRequestPayload>();
