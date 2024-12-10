import { axios } from 'api/axios';

export const getCurrentUser = (): Promise<void> =>
  axios.get('Reports/getgroupreportconfigurations');
