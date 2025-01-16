import { axios } from 'api/axios';
import queryString from 'query-string';
import {
  GroupReportFormResponse,
  SendGroupReportRequest,
  CreateGroupReportConfigurationRequest,
} from 'api/types';
import { GroupReportRequestPayload } from './groupReportService.types';

export const downloadGroupReportRequest = async (
  params: GroupReportRequestPayload,
): Promise<void> => {
  const res: string = await fetchGroupReport(params);
  const fileURL = window.URL.createObjectURL(new Blob([res]));

  const fileDownloadLink = document.createElement('a');
  fileDownloadLink.href = fileURL;
  fileDownloadLink.setAttribute('download', `${params.FileName}.zip`);
  document.body.appendChild(fileDownloadLink);

  fileDownloadLink.click();
  fileDownloadLink.remove();
};

export const fetchGroupReport = (
  params: GroupReportRequestPayload,
): Promise<string> =>
  axios.get('Reports/GroupReport', {
    params,
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });

export const fetchFilters = (): Promise<GroupReportFormResponse> =>
  axios.get('Reports');

export const sendByEmail = (payload: SendGroupReportRequest): Promise<void> =>
  axios.post('/Reports/SendGroupReport', payload);

export const postRegularUpload = (
  payload: CreateGroupReportConfigurationRequest,
): Promise<void> =>
  axios.post('/Reports/creategroupreportconfiguration', payload);
