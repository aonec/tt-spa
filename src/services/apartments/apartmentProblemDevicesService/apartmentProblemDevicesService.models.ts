import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { GetProblemDevicesRequestPayload } from './apartmentProblemDevicesService.types';
import { IndividualDeviceWithExpiredCheckingDateResponse } from 'api/types';
import { getProblemDevices } from './apartmentProblemDevicesService.api';
import { preparedDevicesToFetch } from './apartmentProblemDevicesService.constants';

const ProblemDevicesGate = createGate<GetProblemDevicesRequestPayload>();

const fetchProblemDevicesFx = createEffect<
  GetProblemDevicesRequestPayload,
  IndividualDeviceWithExpiredCheckingDateResponse[]
>(getProblemDevices);

const handleResetProblemDevices = createEvent();

const $problemDevices = createStore<
  IndividualDeviceWithExpiredCheckingDateResponse[] | null
>(null)
  .on(fetchProblemDevicesFx.doneData, (_, devices) => devices)
  .reset(handleResetProblemDevices);

sample({
  clock: ProblemDevicesGate.state,
  fn: preparedDevicesToFetch,
  filter: (getProblemDevicesRequestPayload) => {
    const { fromDate, toDate } = getProblemDevicesRequestPayload.requestPayload;

    return Boolean(fromDate && toDate);
  },
  target: fetchProblemDevicesFx,
});

export const apartmentProblemDevicesService = {
  inputs: { handleResetProblemDevices },
  outputs: { $problemDevices },
  gates: { ProblemDevicesGate },
};
