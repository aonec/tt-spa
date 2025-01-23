import { createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  getAllClosingDevicesQuery,
  lastCloseDevicesByCheckingDatePollQuery,
  startCloseDevicesByCheckingDatePoll,
} from './standartReportService.api';
import { interval } from 'patronum';
import { EPollState } from 'api/types';

const StandartReportGate = createGate();

const handleStartCloseDevicesByCheckingDatePoll =
  startCloseDevicesByCheckingDatePoll.start;
const handleStopCloseDevicesByCheckingDatePoll = createEvent();

sample({
  clock: StandartReportGate.open,
  target: [
    getAllClosingDevicesQuery.start,
    lastCloseDevicesByCheckingDatePollQuery.start,
  ],
});

const { tick: handleRefetchCloseDevicesByCheckingDatePoll } = interval({
  start: handleStartCloseDevicesByCheckingDatePoll,
  timeout: 2000,
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

export const standartReportService = {
  inputs: {
    handleStartCloseDevicesByCheckingDatePoll,
  },
  outputs: {},
  gates: { StandartReportGate },
};
