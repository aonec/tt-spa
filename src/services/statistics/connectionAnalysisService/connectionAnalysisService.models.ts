import { createEffect, createEvent, createStore, sample } from 'effector';
import {
  downloadCalculators,
  getCalculatorsQuery,
} from './connectionAnalysisService.api';
import { createGate } from 'effector-react';
import {
  CalculatorsSortedListApi,
  DownloadParams,
  PageNumberStoreType,
} from './connectionAnalysisService.types';
import { BlobResponseErrorType } from 'types';
import { message } from 'antd';
import { ECalculatorConnectionGroupType } from 'api/types';

const PageGate = createGate();

const handleDownload = createEvent<DownloadParams>();

const setPageNumber =
  createEvent<Record<keyof typeof ECalculatorConnectionGroupType, number>>();

const downloadCalculatorsFx = createEffect<
  DownloadParams,
  void,
  BlobResponseErrorType
>(downloadCalculators);

const $isLoading = getCalculatorsQuery.$pending;

const $isDownloading = downloadCalculatorsFx.pending;

const $calculatorsSortedList = createStore<CalculatorsSortedListApi | null>(
  null,
).on(getCalculatorsQuery.finished.success, (prev, { params, result }) => {
  const filterConnectionGroupType = params.filterConnectionGroupType;
  const calculators = result;

  const currentGroupType = calculators.find((elem) => {
    return elem.connectionGroupType === filterConnectionGroupType;
  });

  if (currentGroupType) {
    const updatedPrev = prev
      ? prev.map((item) =>
          item.connectionGroupType === filterConnectionGroupType
            ? currentGroupType
            : item,
        )
      : [currentGroupType];

    return updatedPrev;
  }
  return calculators;
});

const $pageNumbers = createStore<PageNumberStoreType>({
  Error: 1,
  NoArchives: 1,
  NotPolling: 1,
  Success: 1,
}).on(setPageNumber, (prev, pageNumber) => ({ ...prev, ...pageNumber }));

sample({
  clock: PageGate.open,
  fn: () => ({
    pageNumber: 1,
  }),
  target: getCalculatorsQuery.start,
});

sample({
  clock: setPageNumber,
  fn: (pageNumber) => ({
    pageNumber: Object.values(pageNumber)[0],
    filterConnectionGroupType: Object.keys(pageNumber)[0],
  }),
  target: getCalculatorsQuery.start,
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
  outputs: { $isLoading, $isDownloading, $pageNumbers, $calculatorsSortedList },
  gates: { PageGate },
};
