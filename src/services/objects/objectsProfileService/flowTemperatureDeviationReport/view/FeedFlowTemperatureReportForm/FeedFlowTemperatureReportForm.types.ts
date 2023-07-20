import { HouseManagementResponse } from 'api/myApi';
import { FeedFlowTemperatureRequestPayload } from '../../flowTemperatureDeviationReportService.types';

export type Props = {
  formId: string;
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  handleExportReport: (payload: FeedFlowTemperatureRequestPayload) => void;
};
