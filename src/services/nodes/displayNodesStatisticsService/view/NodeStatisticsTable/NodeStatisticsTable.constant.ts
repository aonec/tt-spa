import dayjs from 'api/dayjs';
import { ReportType } from '../StatisticsGraph/StatisticsGraph.types';

export const ReportTimeType: { [key in ReportType]: dayjs.OpUnitType } = {
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
