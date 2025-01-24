import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { PollCommand, PollResponse } from 'api/types';

export const startCloseDevicesByCheckingDatePoll = createQuery({
  handler: (): Promise<PollResponse> =>
    axios.post('Exports/IndividualDeviceReadings', null, {
      params: { Command: PollCommand.Create },
    }),
});

export const lastCloseDevicesByCheckingDatePollQuery = createQuery<
  [{ isInitial?: boolean } | void],
  PollResponse
>({
  handler: (): Promise<PollResponse> =>
    axios.post('Exports/IndividualDeviceReadings', null, {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});
