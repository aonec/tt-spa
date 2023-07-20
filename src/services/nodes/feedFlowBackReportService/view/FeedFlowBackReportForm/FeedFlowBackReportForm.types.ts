import { HouseManagementResponse } from 'api/types';
import { FeedBackFlowReportPayload } from '../../feedFlowBackReportService.types';

export type FeedFlowBackReportFormProps = {
  formId: string;
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  handleExportReport: (payload: FeedBackFlowReportPayload) => void;
};
