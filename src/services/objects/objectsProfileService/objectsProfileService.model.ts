import { feedFlowBackReportService } from 'services/nodes/feedFlowBackReportService';
import { soiReportService } from './soiReportService';
import { flowTemperatureDeviationReportService } from './flowTemperatureDeviationReport/flowTemperatureDeviationReportService.models';

export const objectsProfileService = {
  inputs: {
    openSoiReportModal: soiReportService.inputs.openSoiReportModal,
    openFeedFlowBackReportModal:
      feedFlowBackReportService.inputs.openFeedFlowBackReportModal,
    openFlowTemperatureDeviationReportModal:
      flowTemperatureDeviationReportService.inputs
        .openFlowTemperatureDeviationReportModal,
  },
};
