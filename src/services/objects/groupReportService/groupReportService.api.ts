import { axios } from '01/axios';
import { GroupReportFormResponse } from 'myApi';
import { GroupReportRequestPayload } from './groupReportService.types';
import queryString from 'query-string';

export const fetchGroupReport = async ({
  Name,
  ...params
}: GroupReportRequestPayload): Promise<void> => {
  const res: string = await axios.get('Reports/GroupReport', {
    params,
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });
  const fileURL = window.URL.createObjectURL(new Blob([res]));

  const fileDownloadLink = document.createElement('a');
  fileDownloadLink.href = fileURL;
  fileDownloadLink.setAttribute('download', `${Name}.zip`);
  document.body.appendChild(fileDownloadLink);

  fileDownloadLink.click();
  fileDownloadLink.remove();
};

export const fetchFilters = (): Promise<GroupReportFormResponse> =>
  axios.get('Reports');
