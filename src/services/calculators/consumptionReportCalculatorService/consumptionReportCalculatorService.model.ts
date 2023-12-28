import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { getReport } from './consumptionReportCalculatorService.api';
import { GetCalculatorReportParams } from './consumptionReportCalculatorService.types';
import { message } from 'antd';
import { BlobResponseErrorType } from 'types';

const handleModalOpen = createEvent();
const handleModalClose = createEvent();

const handleSubmit = createEvent<GetCalculatorReportParams>();

const fetchReportFx = createEffect<
  GetCalculatorReportParams,
  void,
  BlobResponseErrorType
>(getReport);

sample({
  clock: handleSubmit,
  target: fetchReportFx,
});

const handleSuccess = fetchReportFx.doneData;

fetchReportFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(errObject.error.Text || errObject.error.Message);
});

const $isLoading = fetchReportFx.pending;

const $isModalOpen = createStore<boolean>(false)
  .on(handleModalOpen, () => true)
  .on(handleModalClose, () => false)
  .reset(handleSuccess);

export const consumptionReportCalculatorService = {
  inputs: { handleModalOpen, handleModalClose, handleSubmit },
  outputs: { $isModalOpen, $isLoading },
};
