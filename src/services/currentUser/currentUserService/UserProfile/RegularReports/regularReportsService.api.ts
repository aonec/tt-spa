import { axios } from 'api/axios';
import { RegularReportItem } from './regularReportsService.types';

export const getCurrentUser = (): Promise<RegularReportItem[]> =>
  axios.get('Reports/getgroupreportconfigurations');
