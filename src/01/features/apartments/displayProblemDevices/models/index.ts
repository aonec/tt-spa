import { GetProblemDevicesRequestPayload } from './../../../../_api/apartments';
import { createGate } from 'effector-react';
import { IndividualDeviceWithExpiredCheckingDateResponse } from './../../../../../myApi';
import { createEffect, createEvent, createStore } from 'effector';

export const $problemDevices = createStore<
  IndividualDeviceWithExpiredCheckingDateResponse[] | null
>(null);

export const fetchProblemDevicesFx = createEffect<
  GetProblemDevicesRequestPayload,
  IndividualDeviceWithExpiredCheckingDateResponse[]
>();

export const handleResetProblemDevices = createEvent();

export const ProblemDevicesGate = createGate<GetProblemDevicesRequestPayload>();
