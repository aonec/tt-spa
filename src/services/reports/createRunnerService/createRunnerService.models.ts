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
import { interval } from 'patronum';

const GetLastPollGate = createGate();

const setOpen = createEvent<boolean>();

const handleGenerateReport = createEvent<RunnerPayload>();

const handleDownloadFile = createEvent();

const handleReset = createEvent();

const handleStartRefetchLastPoll = createEvent();
const handleStopRefetchLastPoll = createEvent();

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

const $isOpen = createStore<boolean>(false)
  .on(setOpen, (_, data) => data)
  .reset([GetLastPollGate.close, getRunnerReportFileFx.doneData])
  .reset(handleReset);

const $runnerReportPollInfo = createStore<PollResponse | null>(null)
  .on(startRunnerReportPollFx.doneData, (_, info) => info)
  .on(getLastRunnerReportPollFx.doneData, (_, info) => info)
  .reset(handleReset);

const $isDownloading = getRunnerReportFileFx.pending;

const $isGenerating = $runnerReportPollInfo.map(
  (info) => info?.status === PollStatus.Running,
);

const $stageNumber = createStore(1)
  .on($runnerReportPollInfo, (_, pollInfo) => {
    if (
      pollInfo?.status === PollStatus.Running ||
      pollInfo?.status === PollStatus.Pending
    ) {
      return 2;
    }
    if (pollInfo?.status === PollStatus.Done) {
      return 3;
    }
  })
  .reset(handleReset);

sample({ clock: handleGenerateReport, target: startRunnerReportPollFx });

startRunnerReportPollFx.doneData.watch((pollData) => {
  localStorage.setItem('isPollRun', 'true');
  localStorage.setItem('runnerPollStatus', String(pollData.status));
});

handleGenerateReport.watch((reportPayload) => {
  const yearRange = reportPayload.YearRange;
  localStorage.setItem('runnerPollYearRange', String(yearRange));
});

handleReset.watch(() => {
  localStorage.removeItem('runnerPollYearRange');
  localStorage.removeItem('isPollRun');
  localStorage.removeItem('runnerPollStatus');
});

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

sample({
  clock: [startRunnerReportPollFx.doneData, GetLastPollGate.open],
  target: handleStartRefetchLastPoll,
});

sample({
  clock: [handleReset, getLastRunnerReportPollFx.doneData],
  source: $runnerReportPollInfo,
  filter: (pollInfo) => pollInfo?.status !== PollStatus.Running,
  target: handleStopRefetchLastPoll,
});

const { tick: handleRefetchLastPoll } = interval({
  start: handleStartRefetchLastPoll,
  timeout: 20000,
  stop: handleStopRefetchLastPoll,
  leading: false,
});

sample({
  clock: [GetLastPollGate.open, handleRefetchLastPoll],
  filter: () => {
    const isPollStarted = localStorage.getItem('isPollRun');
    return Boolean(isPollStarted);
  },
  target: getLastRunnerReportPollFx,
});

sample({
  clock: getRunnerReportFileFx.doneData,
  target: handleReset,
});

startRunnerReportPollFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

getLastRunnerReportPollFx.doneData.watch((pollInfo) => {
  if (pollInfo.status === PollStatus.Done)
    message.success('Бегунок ожидает загрузки');
});

export const createRunnerService = {
  inputs: { setOpen, handleGenerateReport, handleDownloadFile, handleReset },
  outputs: {
    $isOpen,
    $isGenerating,
    $isDownloading,
    $stageNumber,
  },
  gates: { GetLastPollGate },
};
