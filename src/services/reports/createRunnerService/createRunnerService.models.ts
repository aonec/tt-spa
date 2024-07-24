import { createEffect, createEvent, createStore, sample } from 'effector';
import { getRunnerReportFile } from './createRunnerService.api';
import { RunnerPayload } from './createRunnerService.types';
import { EffectFailDataAxiosError } from 'types';

const setOpen = createEvent<boolean>();

const handleGenerateReport = createEvent<RunnerPayload>();

const getRunnerReportFileFx = createEffect<
  RunnerPayload,
  File,
  EffectFailDataAxiosError
>(getRunnerReportFile);

const $isOpen = createStore<boolean>(false).on(setOpen, (_, data) => data);

const $isGenerating = getRunnerReportFileFx.pending;

const $runnerReportFile = createStore<File | null>(null).on(
  getRunnerReportFileFx.doneData,
  (_, file) => file,
);

sample({ clock: handleGenerateReport,   target: getRunnerReportFileFx });

export const createRunnerService = {
  inputs: { setOpen, handleGenerateReport },
  outputs: { $isOpen, $isGenerating },
};
