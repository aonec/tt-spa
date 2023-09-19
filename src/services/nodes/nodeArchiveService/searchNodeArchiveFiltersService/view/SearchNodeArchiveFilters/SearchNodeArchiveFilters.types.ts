import dayjs from 'api/dayjs';
import { EReportType } from 'api/types';
import { LoadNodeArchiveDataPayload } from '../../../displayNodeArchiveService/displayNodeArchiveService.types';

export type SearchNodeArchiveFiltersProps = {
  loading: boolean;
  handleSubmit: (payload: LoadNodeArchiveDataPayload) => void;
};

export type FormValues = {
  from: null | dayjs.Dayjs;
  to: null | dayjs.Dayjs;
  type: EReportType;
};
