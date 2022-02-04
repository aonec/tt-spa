import { createDomain } from 'effector';

const createReportDomain = createDomain('CreateReport');

const $isModalOpen = createReportDomain.createStore(false);

export const createReportOutputs = {
  $isModalOpen,
};

const openModalButtonClicked = createReportDomain.createEvent();
const closeModalButonClicked = createReportDomain.createEvent();

export const createReportInputs = {
  openModalButtonClicked,
  closeModalButonClicked,
};
