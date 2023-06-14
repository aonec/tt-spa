import { createDomain, forward } from 'effector';
import { FeedBackFlowReportPayload } from './feedFlowBackReportService.types';
import { getFeedBackFlowReport } from './feedFlowBackReportService.api';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import { BlobResponseErrorType } from 'types';
import { message } from 'antd';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const domain = createDomain('feedFlowBackReportService');

const openFeedFlowBackReportModal = domain.createEvent();
const closeFeedFlowBackReportModal = domain.createEvent();

const handleExportReport = domain.createEvent<FeedBackFlowReportPayload>();

const exportFeedBackFlowReportFx = domain.createEffect<
  FeedBackFlowReportPayload,
  void,
  BlobResponseErrorType
>(getFeedBackFlowReport);

const $isModalOpen = domain
  .createStore(false)
  .on(openFeedFlowBackReportModal, () => true)
  .reset(closeFeedFlowBackReportModal, exportFeedBackFlowReportFx.doneData);

forward({
  from: handleExportReport,
  to: exportFeedBackFlowReportFx,
});

exportFeedBackFlowReportFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(errObject.error.Text || errObject.error.Message);
});

const $isLoading = exportFeedBackFlowReportFx.pending;

export const feedFlowBackReportService = {
  inputs: {
    openFeedFlowBackReportModal,
    closeFeedFlowBackReportModal,
    handleExportReport,
  },
  outputs: {
    $isModalOpen,
    $existingCities: addressSearchService.outputs.$existingCities,
    $houseManagements: houseManagementsService.outputs.$houseManagements,
    $isLoading,
  },
  gates: {
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
  },
};
