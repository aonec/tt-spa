import { createDomain, forward } from 'effector';
import { getReport } from './consumptionReportCalculatorService.api';
import { GetCalculatorReportParams } from './consumptionReportCalculatorService.types';
import { message } from 'antd';
import { BlobResponseErrorType } from 'types';

const domain = createDomain('consumptionReportCalculatorService');

const handleModalOpen = domain.createEvent();
const handleModalClose = domain.createEvent();

const handleSubmit = domain.createEvent<GetCalculatorReportParams>();

const fetchReportFx = domain.createEffect<
  GetCalculatorReportParams,
  void,
  BlobResponseErrorType
>(getReport);

forward({
  from: handleSubmit,
  to: fetchReportFx,
});

const handleSuccess = fetchReportFx.doneData;

fetchReportFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(errObject.error.Text || errObject.error.Message);
});

const $isLoading = fetchReportFx.pending;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleModalOpen, () => true)
  .on(handleModalClose, () => false)
  .reset(handleSuccess);

export const consumptionReportCalculatorService = {
  inputs: { handleModalOpen, handleModalClose, handleSubmit },
  outputs: { $isModalOpen, $isLoading },
};
