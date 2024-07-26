import { createEffect, createEvent, createStore, sample } from 'effector';
import {
  getLastRunnerReportPoll,
  getRunnerReportFile,
  startRunnerReportPoll,
} from './createRunnerService.api';
import {
  PollResponse,
  PollStatus,
  RunnerPayload,
} from './createRunnerService.types';
import { EffectFailDataAxiosError } from 'types';

const setOpen = createEvent<boolean>();

const handleGenerateReport = createEvent<RunnerPayload>();

const startRunnerReportPollFx = createEffect<
  RunnerPayload,
  PollResponse,
  EffectFailDataAxiosError
>(startRunnerReportPoll);

const getLastRunnerReportPollFx = createEffect<
  RunnerPayload,
  PollResponse,
  EffectFailDataAxiosError
>(getLastRunnerReportPoll);

const getRunnerReportFileFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(getRunnerReportFile);

const $isOpen = createStore<boolean>(false).on(setOpen, (_, data) => data);

const $runnerReportPollInfo = createStore<PollResponse | null>(null)
  .on(startRunnerReportPollFx.doneData, (_, info) => info)
  .on(getLastRunnerReportPollFx.doneData, (_, info) => info);

const $isGenerating = $runnerReportPollInfo.map(
  (info) => info?.status === PollStatus.pending,
);

const $isGeneratingDone = $runnerReportPollInfo.map(
  (info) => info?.status === PollStatus.done,
);

sample({ clock: handleGenerateReport, target: startRunnerReportPollFx });

export const createRunnerService = {
  inputs: { setOpen, handleGenerateReport },
  outputs: { $isOpen, $isGenerating, $isGeneratingDone },
};
