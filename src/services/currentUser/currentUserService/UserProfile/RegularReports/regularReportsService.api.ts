import { axios } from 'api/axios';
import { GroupReportConfigurationServiceModel } from 'api/types';

export const getCurrentUser = (): Promise<
  GroupReportConfigurationServiceModel[]
> => axios.get('Reports/getgroupreportconfigurations');
