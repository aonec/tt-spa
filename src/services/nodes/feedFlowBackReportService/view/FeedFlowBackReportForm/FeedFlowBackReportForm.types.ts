import { HouseManagementResponse } from 'api/myApi';
import { FeedBackFlowReportPayload } from '../../feedFlowBackReportService.types';

export type FeedFlowBackReportFormProps = {
  formId: string;
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  handleExportReport: (payload: FeedBackFlowReportPayload) => void;
};
