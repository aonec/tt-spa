import { axios } from 'api/axios';
import { PollResponse, RunnerPayload } from './createRunnerService.types';
import { DeviceResource, PollCommand } from 'api/types';
import queryString from 'query-string';
import { downloadURI } from 'utils/downloadByURL';

export const startRunnerReportPoll = (
  payload: RunnerPayload,
): Promise<PollResponse> =>
  axios.get('Reports/RunnerReports', {
    params: {
      ...payload,
      Resource: DeviceResource.Electricity,
      Command: PollCommand.Create,
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });

export const getLastRunnerReportPoll = (): Promise<PollResponse> =>
  axios.get('Reports/RunnerReports', {
    params: {
      Resource: DeviceResource.Electricity,
      Command: PollCommand.GetLast,
    },
  });

export const getRunnerReportFile = async (pollId: number) => {
  const res: string = await axios.get(`Documents/poll/${pollId}/artifact`, {
    responseType: 'blob',
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });
  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, 'Бегунок', true);
};
