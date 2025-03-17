import { createEffect, createEvent, createStore, sample } from 'effector';
import {
  downloadCalculators,
  getCalculators,
} from './connectionAnalysisService.api';
import { createGate } from 'effector-react';
import {
  CalculatorsSortedListApi,
  DownloadParams,
} from './connectionAnalysisService.types';
import { BlobResponseErrorType } from 'types';
import { message } from 'antd';

const PageGate = createGate();

const handleDownload = createEvent<DownloadParams>();

const getCalculatorsFx = createEffect<void, CalculatorsSortedListApi>(
  getCalculators,
);

const downloadCalculatorsFx = createEffect<
  DownloadParams,
  void,
  BlobResponseErrorType
>(downloadCalculators);

const $isLoading = getCalculatorsFx.pending;

const $isDownloading = downloadCalculatorsFx.pending;

const $calculatorsSortedList = createStore<CalculatorsSortedListApi | null>(
  null,
).on(getCalculatorsFx.doneData, (_, data) => {
  return data;
});

sample({
  clock: PageGate.open,
  target: getCalculatorsFx,
});

sample({
  clock: handleDownload,
  target: downloadCalculatorsFx,
});

downloadCalculatorsFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(errObject.error.Message || errObject.error.Text);
});

export const connectionAnalysisService = {
  inputs: { handleDownload },
  outputs: { $calculatorsSortedList, $isLoading, $isDownloading },
  gates: { PageGate },
};
