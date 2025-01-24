import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { PollCommand, PollResponse } from 'api/types';
import { IndividualDeviceExportQuery } from './exportStandartReportService.types';
import queryString from 'query-string';

export const startIndividualDevicesExportPoll = createQuery<
  [IndividualDeviceExportQuery],
  PollResponse
>({
  handler: (params): Promise<PollResponse> =>
    axios.get('Exports/IndividualDeviceReadings', {
      params: { Command: PollCommand.Create, ...params },
      paramsSerializer: (params) => queryString.stringify(params),
    }),
});

export const lastIndividualDevicesExportPollQuery = createQuery<
  [{ isInitial?: boolean } | void],
  PollResponse
>({
  handler: (): Promise<PollResponse> =>
    axios.get('Exports/IndividualDeviceReadings', {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});
