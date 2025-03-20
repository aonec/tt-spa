import { createEvent, createStore, merge, sample } from 'effector';
import {
  lastIndividualDevicesExportPollQuery,
  startIndividualDevicesExportPoll,
} from './exportStandartReportService.api';
import { EPollState } from 'api/types';
import { interval } from 'patronum';

const openModal = createEvent();
const closeModal = createEvent();

const POLL_TIMEOUT = 2000;

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const handleStartIndividualDevicesExportPoll =
  startIndividualDevicesExportPoll.start;
const handleStopIndividualDevicesExportPoll = createEvent();
const handleStartIndividualDevicesExportPollByInitial = createEvent();

const { tick: handleRefetchIndividualDevicesExportPoll } = interval({
  start: merge([
    handleStartIndividualDevicesExportPoll,
    handleStartIndividualDevicesExportPollByInitial,
  ]),
  timeout: POLL_TIMEOUT,
  stop: handleStopIndividualDevicesExportPoll,
  leading: false,
});

sample({
  clock: handleRefetchIndividualDevicesExportPoll,
  target: lastIndividualDevicesExportPollQuery.start,
});

sample({
  clock: openModal,
  fn: () => ({ isInitial: true }),
  target: lastIndividualDevicesExportPollQuery.start,
});

sample({
  clock: lastIndividualDevicesExportPollQuery.finished.success,
  filter: ({ result }) =>
    result.status === EPollState.Error || result.status === EPollState.Done,
  target: handleStopIndividualDevicesExportPoll,
});

sample({
  clock: lastIndividualDevicesExportPollQuery.finished.success,
  filter: ({ params, result }) => {
    const isLoading =
      result.status === EPollState.Pending ||
      result.status === EPollState.Running;

    const isInitial = Boolean(params?.isInitial);

    return isInitial && isLoading;
  },
  target: handleStartIndividualDevicesExportPollByInitial,
});

export const exportStandartReportService = {
  inputs: { openModal, closeModal, handleStartIndividualDevicesExportPoll },
  outputs: { $isModalOpen },
};
