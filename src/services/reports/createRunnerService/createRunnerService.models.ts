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
import { message } from 'antd';
import { createGate } from 'effector-react';

const GetLastPollGate = createGate();

const setOpen = createEvent<boolean>();

const handleGenerateReport = createEvent<RunnerPayload>();

const handleDownloadFile = createEvent();

const startRunnerReportPollFx = createEffect<
  RunnerPayload,
  PollResponse,
  EffectFailDataAxiosError
>(startRunnerReportPoll);

const getLastRunnerReportPollFx = createEffect<
  void,
  PollResponse,
  EffectFailDataAxiosError
>(getLastRunnerReportPoll);

const getRunnerReportFileFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(getRunnerReportFile);

const $isDownloading = getRunnerReportFileFx.pending;

const $isOpen = createStore<boolean>(false)
  .on(setOpen, (_, data) => data)
  .reset([GetLastPollGate.close, getRunnerReportFileFx.doneData]);

const $runnerReportPollInfo = createStore<PollResponse | null>(null)
  .on(startRunnerReportPollFx.doneData, (_, info) => info)
  .on(getLastRunnerReportPollFx.doneData, (_, info) => info);

$runnerReportPollInfo.watch((data) => console.log(data));

const $isGenerating = $runnerReportPollInfo.map(
  (info) => info?.status === PollStatus.Running,
);

const $isGeneratingDone = $runnerReportPollInfo.map(
  (info) => info?.status === PollStatus.Done,
);

sample({ clock: handleGenerateReport, target: startRunnerReportPollFx });

startRunnerReportPollFx.doneData.watch((pollData) => {
  localStorage.setItem('runnerPollId', String(pollData.id));
  localStorage.setItem('runnerPollStatus', String(pollData.status));
});

sample({ clock: GetLastPollGate.open, target: getLastRunnerReportPollFx });

sample({
  clock: handleDownloadFile,
  source: $runnerReportPollInfo,
  filter: (pollInfo) => {
    return pollInfo?.status === PollStatus.Done && Boolean(pollInfo?.id);
  },
  fn: (pollInfo) => {
    return pollInfo?.id!;
  },
  target: getRunnerReportFileFx,
});

startRunnerReportPollFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const createRunnerService = {
  inputs: { setOpen, handleGenerateReport, handleDownloadFile },
  outputs: { $isOpen, $isGenerating, $isGeneratingDone, $isDownloading },
  gates: { GetLastPollGate },
};
