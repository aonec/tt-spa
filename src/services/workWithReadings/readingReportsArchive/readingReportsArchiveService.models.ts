import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { individualDevicesReportArchiveQuery } from './readingReportsArchiveService.api';
import { IndividualDevicesReportArchiveQueryParams } from './readingReportsArchiveService.types';

const ReadingReportsArchiveGate = createGate();

const setQueryParams = createEvent<IndividualDevicesReportArchiveQueryParams>();

const $queryParams = createStore<IndividualDevicesReportArchiveQueryParams>({
  PageSize: 10,
}).on(setQueryParams, (prev, params) => ({ ...prev, ...params }));

sample({
  source: $queryParams,
  clock: [ReadingReportsArchiveGate.open, $queryParams.updates],
  target: individualDevicesReportArchiveQuery.start,
});

export const readingReportsArchiveService = {
  inputs: { setQueryParams },
  outputs: { $queryParams },
  gates: { ReadingReportsArchiveGate },
};
