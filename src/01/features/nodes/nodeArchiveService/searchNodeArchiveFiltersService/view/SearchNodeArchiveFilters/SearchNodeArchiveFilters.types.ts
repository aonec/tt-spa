import moment from 'moment';
import { EReportType } from '../../api/types';
import { LoadNodeArchiveDataPayload } from '../../../displayNodeArchiveService/displayNodeArchiveService.types';

export type SearchNodeArchiveFiltersProps = {
  loading: boolean;
  handleSubmit: (payload: LoadNodeArchiveDataPayload) => void;
};

export type FormValues = {
  from: null | moment.Moment;
  to: null | moment.Moment;
  type: EReportType;
};
