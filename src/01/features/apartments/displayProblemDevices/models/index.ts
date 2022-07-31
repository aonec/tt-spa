import { GetProblemDevicesRequestPayload } from './../../../../_api/apartments';
import { createGate } from 'effector-react';
import { createEffect, createStore } from 'effector';
import { IndividualDeviceWithExpiredCheckingDateResponse } from '../../../../../api/types';

export const $problemDevices = createStore<
  IndividualDeviceWithExpiredCheckingDateResponse[] | null
>(null);

export const fetchProblemDevicesFx = createEffect<
  GetProblemDevicesRequestPayload,
  IndividualDeviceWithExpiredCheckingDateResponse[]
>();

export const ProblemDevicesGate = createGate<GetProblemDevicesRequestPayload>();
