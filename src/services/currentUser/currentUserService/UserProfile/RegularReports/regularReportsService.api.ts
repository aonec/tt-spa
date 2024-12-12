import { axios } from 'api/axios';
import { GroupReportConfigurationServiceModel } from 'api/types';

export const getGroupReportConfigurations = (): Promise<
  GroupReportConfigurationServiceModel[]
> => axios.get('Reports/getgroupreportconfigurations');

export const deleteGroupReportConfiguration = (id: number): Promise<void> =>
  axios.delete(`Reports/removegroupreportconfiguration/${id}`);
