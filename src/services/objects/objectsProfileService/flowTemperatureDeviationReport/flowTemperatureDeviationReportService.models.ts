import { createDomain, forward } from 'effector';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import { getFeedFlowPipeTemperatureReport } from './flowTemperatureDeviationReportService.api';
import { EffectFailDataAxiosError } from 'types';
import { FeedFlowTemperatureRequestPayload } from './flowTemperatureDeviationReportService.types';
import { message } from 'antd';

const domain = createDomain('flowTemperatureDeviationReportService');

const openFlowTemperatureDeviationReportModal = domain.createEvent();
const closeFlowTemperatureDeviationReportModal = domain.createEvent();

const handleExportReport =
  domain.createEvent<FeedFlowTemperatureRequestPayload>();

const exportFlowTemperatureDeviationReportFx = domain.createEffect<
  FeedFlowTemperatureRequestPayload,
  void,
  EffectFailDataAxiosError
>(getFeedFlowPipeTemperatureReport);

const $isModalOpen = domain
  .createStore(false)
  .on(openFlowTemperatureDeviationReportModal, () => true)
  .reset(closeFlowTemperatureDeviationReportModal);

forward({
  from: handleExportReport,
  to: exportFlowTemperatureDeviationReportFx,
});

exportFlowTemperatureDeviationReportFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const $isLoading = exportFlowTemperatureDeviationReportFx.pending;

export const flowTemperatureDeviationReportService = {
  inputs: {
    openFlowTemperatureDeviationReportModal,
    closeFlowTemperatureDeviationReportModal,
    handleExportReport,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
    $existingCities: addressSearchService.outputs.$existingCities,
    $houseManagements: houseManagementsService.outputs.$houseManagements,
  },
  gates: {
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
  },
};
