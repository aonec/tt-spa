import { axios } from 'api/axios';
import { saveAs } from 'file-saver';
import { PollResponse, RunnerPayload } from './createRunnerService.types';
import { DeviceResource, PollCommand } from 'api/types';
import queryString from 'query-string';

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

export const getLastRunnerReportPoll = (
  payload: RunnerPayload,
): Promise<PollResponse> =>
  axios.get('Reports/RunnerReports', {
    params: {
      ...payload,
      Resource: DeviceResource.Electricity,
      Command: PollCommand.GetLast,
    },
  });

export const getRunnerReportFile = async (pollId: number) => {
  const url: string = await axios.get(`Documents/poll/${pollId}/artifact`);
  saveAs(url);
};
