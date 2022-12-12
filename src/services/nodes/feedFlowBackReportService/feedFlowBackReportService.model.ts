import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { createDomain } from 'effector';

const domain = createDomain('feedFlowBackReportService');

const openFeedFlowBackReportModal = domain.createEvent();
const closeFeedFlowBackReportModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openFeedFlowBackReportModal, () => true)
  .reset(closeFeedFlowBackReportModal);

export const feedFlowBackReportService = {
  inputs: {
    openFeedFlowBackReportModal,
    closeFeedFlowBackReportModal,
  },
  outputs: {
    $isModalOpen,
    $existingCities,
  },
};
