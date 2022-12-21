import { createDomain } from 'effector';

const domain = createDomain('consolidatedReportService');

const openConsolidatedReportModal = domain.createEvent();
const closeConsolidatedReportModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openConsolidatedReportModal, () => true)
  .reset(closeConsolidatedReportModal);

export const consolidatedReportService = {
  inputs: {
    openConsolidatedReportModal,
    closeConsolidatedReportModal,
  },
  outputs: { $isModalOpen },
};
