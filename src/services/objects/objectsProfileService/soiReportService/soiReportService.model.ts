import { createDomain } from 'effector';

const domain = createDomain('soiReportService');

const openSoiReportModal = domain.createEvent();

const closeSoiReportModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openSoiReportModal, () => true)
  .reset(closeSoiReportModal);

export const soiReportService = {
  inputs: { openSoiReportModal, closeSoiReportModal },
  outputs: {
    $isModalOpen,
  },
};
