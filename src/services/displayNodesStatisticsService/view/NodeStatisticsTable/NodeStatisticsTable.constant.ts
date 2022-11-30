import { ReportType } from '01/_pages/Graph/components/GraphView/GraphView.types';
import moment from 'moment';

export const ReportTimeType: { [key in ReportType]: moment.unitOfTime.Base } = {
  monthly: 'month',
  daily: 'day',
  hourly: 'hour',
};

export const ReportStartTimeFormat: { [key in ReportType]: string } = {
  monthly: 'DD.MM.YYYY',
  daily: 'DD.MM.YYYY HH:mm',
  hourly: 'DD.MM.YYYY HH:mm',
};

export const ReportEndTimeFormat: { [key in ReportType]: string } = {
  monthly: 'DD.MM.YYYY',
  daily: 'HH:mm',
  hourly: 'HH:mm',
};

export const NODE_STATISTICS_PAGE_SIZE = 10;
