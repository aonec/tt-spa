import { feedFlowBackReportService } from 'services/nodes/feedFlowBackReportService';
import { soiReportService } from './soiReportService';

export const objectsProfileService = {
  inputs: {
    openSoiReportModal: soiReportService.inputs.openSoiReportModal,
    openFeedFlowBackReportModal:
      feedFlowBackReportService.inputs.openFeedFlowBackReportModal,
  },
};
