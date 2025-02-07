import { createEvent, merge, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  getAllClosingDevicesQuery,
  lastCloseDevicesByCheckingDatePollQuery,
  lastCloseDevicesWithoutReadingsPollQuery,
  lastDuplicateReadingsPollQuery,
  startCloseDevicesByCheckingDatePoll,
  startCloseDevicesWithoutReadingsPoll,
  startDuplicateReadingsPoll,
} from './standartReportService.api';
import { interval } from 'patronum';
import { EPollState } from 'api/types';

const StandartReportGate = createGate();

const POLL_TIMEOUT = 2000;

sample({
  clock: StandartReportGate.open,
  fn: () => ({ isInitial: true }),
  target: [
    getAllClosingDevicesQuery.start,
    lastCloseDevicesByCheckingDatePollQuery.start,
    lastCloseDevicesWithoutReadingsPollQuery.start,
    lastDuplicateReadingsPollQuery.start,
  ],
});

sample({
  clock: [
    lastCloseDevicesByCheckingDatePollQuery.finished.success,
    lastCloseDevicesWithoutReadingsPollQuery.finished.success,
    lastDuplicateReadingsPollQuery.finished.success,
  ],
  filter: ({ result }) =>
    result.status === EPollState.Error || result.status === EPollState.Done,
  target: getAllClosingDevicesQuery.start,
});

// ---- CloseDevicesByCheckingDate ----

const handleStartCloseDevicesByCheckingDatePoll =
  startCloseDevicesByCheckingDatePoll.start;
const handleStopCloseDevicesByCheckingDatePoll = createEvent();
const handleStartCloseDevicesByCheckingDatePollByInitial = createEvent();

const { tick: handleRefetchCloseDevicesByCheckingDatePoll } = interval({
  start: merge([
    handleStartCloseDevicesByCheckingDatePoll,
    handleStartCloseDevicesByCheckingDatePollByInitial,
  ]),
  timeout: POLL_TIMEOUT,
  stop: handleStopCloseDevicesByCheckingDatePoll,
  leading: false,
});

sample({
  clock: handleRefetchCloseDevicesByCheckingDatePoll,
  target: lastCloseDevicesByCheckingDatePollQuery.start,
});

sample({
  clock: lastCloseDevicesByCheckingDatePollQuery.finished.success,
  filter: ({ result }) =>
    result.status === EPollState.Error || result.status === EPollState.Done,
  target: handleStopCloseDevicesByCheckingDatePoll,
});

sample({
  clock: lastCloseDevicesByCheckingDatePollQuery.finished.success,
  filter: ({ params, result }) => {
    const isLoading =
      result.status === EPollState.Pending ||
      result.status === EPollState.Running;

    const isInitial = Boolean(params?.isInitial);

    return isInitial && isLoading;
  },
  target: handleStartCloseDevicesByCheckingDatePollByInitial,
});

// ---- CloseDevicesWithoutReadings ----

const handleStartCloseDevicesWithoutReadingsPoll =
  startCloseDevicesWithoutReadingsPoll.start;
const handleStopCloseDevicesWithoutReadingsPoll = createEvent();
const handleStartCloseDevicesWithoutReadingsPollByInitial = createEvent();

const { tick: handleRefetchCloseDevicesWithoutReadingsPoll } = interval({
  start: merge([
    handleStartCloseDevicesWithoutReadingsPoll,
    handleStartCloseDevicesWithoutReadingsPollByInitial,
  ]),
  timeout: POLL_TIMEOUT,
  stop: handleStopCloseDevicesWithoutReadingsPoll,
  leading: false,
});

sample({
  clock: handleRefetchCloseDevicesWithoutReadingsPoll,
  target: lastCloseDevicesWithoutReadingsPollQuery.start,
});

sample({
  clock: lastCloseDevicesWithoutReadingsPollQuery.finished.success,
  filter: ({ result }) =>
    result.status === EPollState.Error || result.status === EPollState.Done,
  target: handleStopCloseDevicesWithoutReadingsPoll,
});

sample({
  clock: lastCloseDevicesWithoutReadingsPollQuery.finished.success,
  filter: ({ params, result }) => {
    const isLoading =
      result.status === EPollState.Pending ||
      result.status === EPollState.Running;

    const isInitial = Boolean(params?.isInitial);

    return isInitial && isLoading;
  },
  target: handleStartCloseDevicesWithoutReadingsPollByInitial,
});

// ---- DuplicateReadings ----

const handleStartDuplicateReadingsPoll = startDuplicateReadingsPoll.start;
const handleStopDuplicateReadingsPoll = createEvent();
const handleStartDuplicateReadingsPollByInitial = createEvent();

const { tick: handleRefetchDuplicateReadingsPoll } = interval({
  start: merge([
    handleStartDuplicateReadingsPoll,
    handleStartDuplicateReadingsPollByInitial,
  ]),
  timeout: POLL_TIMEOUT,
  stop: handleStopDuplicateReadingsPoll,
  leading: false,
});

sample({
  clock: handleRefetchDuplicateReadingsPoll,
  target: lastDuplicateReadingsPollQuery.start,
});

sample({
  clock: lastDuplicateReadingsPollQuery.finished.success,
  filter: ({ result }) =>
    result.status === EPollState.Error || result.status === EPollState.Done,
  target: handleStopDuplicateReadingsPoll,
});

sample({
  clock: lastDuplicateReadingsPollQuery.finished.success,
  filter: ({ params, result }) => {
    const isLoading =
      result.status === EPollState.Pending ||
      result.status === EPollState.Running;

    const isInitial = Boolean(params?.isInitial);

    return isInitial && isLoading;
  },
  target: handleStartDuplicateReadingsPollByInitial,
});

export const standartReportService = {
  inputs: {
    handleStartCloseDevicesByCheckingDatePoll,
    handleStartCloseDevicesWithoutReadingsPoll,
    handleStartDuplicateReadingsPoll,
  },
  outputs: {},
  gates: { StandartReportGate },
};
