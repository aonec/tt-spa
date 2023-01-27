import { createDomain, forward } from 'effector';
import { FeedBackFlowReportPayload } from './feedFlowBackReportService.types';
import { getFeedBackFlowReport } from './feedFlowBackReportService.api';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('feedFlowBackReportService');

const openFeedFlowBackReportModal = domain.createEvent();
const closeFeedFlowBackReportModal = domain.createEvent();

const handleExportReport = domain.createEvent<FeedBackFlowReportPayload>();

const exportFeedBackFlowReportFx = domain.createEffect<
  FeedBackFlowReportPayload,
  void,
  EffectFailDataAxiosError
>(getFeedBackFlowReport);

const $isModalOpen = domain
  .createStore(false)
  .on(openFeedFlowBackReportModal, () => true)
  .reset(closeFeedFlowBackReportModal, exportFeedBackFlowReportFx.doneData);

forward({
  from: handleExportReport,
  to: exportFeedBackFlowReportFx,
});

exportFeedBackFlowReportFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

const $isLoading = exportFeedBackFlowReportFx.pending;

export const feedFlowBackReportService = {
  inputs: {
    openFeedFlowBackReportModal,
    closeFeedFlowBackReportModal,
    handleExportReport,
  },
  outputs: {
    $isModalOpen,
    $existingCities,
    $houseManagements: houseManagementsService.outputs.$houseManagements,
    $isLoading,
  },
  gates: {
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
  },
};
