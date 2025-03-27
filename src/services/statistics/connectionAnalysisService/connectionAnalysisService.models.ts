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

const setPageNumber = createEvent<number>();

const getCalculatorsFx = createEffect<
  { pageNumber: number },
  CalculatorsSortedListApi
>(getCalculators);

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

const $pageNumber = createStore<number>(1).on(
  setPageNumber,
  (_, pageNumber) => pageNumber,
);

sample({
  clock: PageGate.open,
  fn: () => ({ pageNumber: 1 }),
  target: getCalculatorsFx,
});

sample({
  clock: setPageNumber,
  fn: (pageNumber) => ({ pageNumber }),
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
  inputs: { handleDownload, setPageNumber },
  outputs: { $calculatorsSortedList, $isLoading, $isDownloading, $pageNumber },
  gates: { PageGate },
};
