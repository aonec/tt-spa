import { axios } from '01/axios';
import { GetCalculatorReportParams } from './consumptionReportCalculatorService.types';
import { downloadURI } from 'services/reports/CreateReportModal/utils';

export const getReport = async ({
  Name,
  ...params
}: GetCalculatorReportParams) => {
  const res: string = await axios.get('Reports/Report', {
    responseType: 'blob',
    params,
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, Name);
};
