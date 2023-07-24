import { GroupReportFormResponse } from 'api/types';
import { GroupReportRequestPayload } from '../../groupReportService.types';

export type GroupReportFormProps = {
  formId: string;
  handleDownload: (payload: Partial<GroupReportRequestPayload>) => void;
  reportFilters: GroupReportFormResponse;
};
