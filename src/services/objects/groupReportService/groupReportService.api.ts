import { axios } from 'api/axios';
import { GroupReportFormResponse } from 'myApi';
import { GroupReportRequestPayload } from './groupReportService.types';
import queryString from 'query-string';

export const downloadGroupReportRequest = async ({
  Name,
  ...params
}: GroupReportRequestPayload): Promise<void> => {
  const res: string = await fetchGroupReport(params);
  const fileURL = window.URL.createObjectURL(new Blob([res]));

  const fileDownloadLink = document.createElement('a');
  fileDownloadLink.href = fileURL;
  fileDownloadLink.setAttribute('download', `${Name}.zip`);
  document.body.appendChild(fileDownloadLink);

  fileDownloadLink.click();
  fileDownloadLink.remove();
};

export const fetchGroupReport = (
  params: Omit<GroupReportRequestPayload, 'Name'>,
): Promise<string> =>
  axios.get('Reports/GroupReport', {
    params,
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });

export const fetchFilters = (): Promise<GroupReportFormResponse> =>
  axios.get('Reports');
