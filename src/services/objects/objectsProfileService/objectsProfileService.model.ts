import { feedFlowBackReportService } from 'services/nodes/feedFlowBackReportService';
import { soiReportService } from './soiReportService';
import { flowTemperatureDeviationReportService } from './flowTemperatureDeviationReport/flowTemperatureDeviationReportService.models';
import { createEvent, createStore } from 'effector';
import { BuildingsPageSegment } from './view/ObjectsProfile/ObjectsProfile.types';

const setSegment = createEvent<BuildingsPageSegment>();

const $pageSegment = createStore<BuildingsPageSegment>('list').on(
  setSegment,
  (_, segment) => segment,
);

export const objectsProfileService = {
  outputs: { $pageSegment },
  inputs: {
    openSoiReportModal: soiReportService.inputs.openSoiReportModal,
    openFeedFlowBackReportModal:
      feedFlowBackReportService.inputs.openFeedFlowBackReportModal,
    openFlowTemperatureDeviationReportModal:
      flowTemperatureDeviationReportService.inputs
        .openFlowTemperatureDeviationReportModal,
    setSegment,
  },
};
