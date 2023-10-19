import { createEffect, createEvent, createStore } from 'effector';
import { forward } from 'effector';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import { getFeedFlowPipeTemperatureReport } from './flowTemperatureDeviationReportService.api';
import { EffectFailDataAxiosError } from 'types';
import { FeedFlowTemperatureRequestPayload } from './flowTemperatureDeviationReportService.types';
import { message } from 'antd';

const openFlowTemperatureDeviationReportModal = createEvent();
const closeFlowTemperatureDeviationReportModal = createEvent();

const handleExportReport = createEvent<FeedFlowTemperatureRequestPayload>();

const exportFlowTemperatureDeviationReportFx = createEffect<
  FeedFlowTemperatureRequestPayload,
  void,
  EffectFailDataAxiosError
>(getFeedFlowPipeTemperatureReport);

const $isModalOpen = createStore(false)
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
