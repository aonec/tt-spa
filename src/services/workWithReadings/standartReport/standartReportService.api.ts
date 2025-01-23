import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  GetIndividualDevicesToClose,
  PollCommand,
  PollResponse,
} from 'api/types';

export const getAllClosingDevicesQuery = createQuery<
  [],
  GetIndividualDevicesToClose
>({
  handler: () => axios.get(`IndividualDevices/getAllClosing`),
});

// pending -> running -> done | error

export const startCloseDevicesByCheckingDatePoll = createQuery({
  handler: (): Promise<PollResponse> =>
    axios.post('IndividualDevices/CloseDevicesByCheckingDate', null, {
      params: { Command: PollCommand.Create },
    }),
});

export const lastCloseDevicesByCheckingDatePollQuery = createQuery({
  handler: (): Promise<PollResponse> =>
    axios.post('IndividualDevices/CloseDevicesByCheckingDate', null, {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});

export const lastCloseDevicesWithoutReadingsPollQuery = createQuery({
  handler: (): Promise<PollResponse> =>
    axios.post('IndividualDevices/CloseDevicesWithoutReadings', null, {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});

export const lastDuplicateReadingsPollQuery = createQuery({
  handler: (): Promise<PollResponse> =>
    axios.post('Apartments/DuplicateReadings', null, {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});
