import { axios } from 'api/axios';
import { GetCalculatorReportParams } from './consumptionReportCalculatorService.types';
import { downloadURI } from 'utils/downloadByURL';

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
