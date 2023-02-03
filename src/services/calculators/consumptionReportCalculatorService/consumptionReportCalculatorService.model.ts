import { createDomain, forward } from 'effector';
import { getReport } from './consumptionReportCalculatorService.api';
import { GetCalculatorReportParams } from './consumptionReportCalculatorService.types';
import { message } from 'antd';

const domain = createDomain('consumptionReportCalculatorService');

const handleModalOpen = domain.createEvent();
const handleModalClose = domain.createEvent();

const handleSubmit = domain.createEvent<GetCalculatorReportParams>();

const fetchReportFx = domain.createEffect<
  GetCalculatorReportParams,
  void,
  { message: string }
>(getReport);

forward({
  from: handleSubmit,
  to: fetchReportFx,
});

fetchReportFx.failData.watch((error) => {
  message.error(error.message);
});

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleModalOpen, () => true)
  .on(handleModalClose, () => false);

export const consumptionReportCalculatorService = {
  inputs: { handleModalOpen, handleModalClose, handleSubmit },
  outputs: { $isModalOpen },
};
