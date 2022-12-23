import { createDomain } from 'effector';
import { getReport } from './consumptionReportCalculatorService.api';
import { GetCalculatorReportParams } from './consumptionReportCalculatorService.types';

const domain = createDomain('consumptionReportCalculatorService');

const handleModalOpen = domain.createEvent();
const handleModalClose = domain.createEvent();

const handleSubmit = domain.createEvent();

const fetchReportFx = domain.createEffect<GetCalculatorReportParams, void>(
  getReport
);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleModalOpen, () => true)
  .on(handleModalClose, () => false);

export const consumptionReportCalculatorService = {
  inputs: { handleModalOpen, handleModalClose },
  outputs: { $isModalOpen },
};
