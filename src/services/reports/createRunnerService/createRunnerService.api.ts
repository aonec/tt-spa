import { axios } from 'api/axios';
import { RunnerPayload } from './createRunnerService.types';

export const getRunnerReportFile = (payload: RunnerPayload): Promise<File> =>
  axios.get('Reports/RunnerReports', { params: payload });
