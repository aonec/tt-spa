import { axios } from 'api/axios';
import {
  CalculatorsSortedListApi,
  DownloadParams,
} from './connectionAnalysisService.types';
import { downloadURI } from 'utils/downloadByURL';

export const getCalculators = (): Promise<CalculatorsSortedListApi> =>
  axios.get('CalculatorsStatistics');

export const downloadCalculators = async ({
  filterConnectionGroupType,
  name,
}: DownloadParams) => {
  const res: string = await axios.get('CalculatorsStatistics/export', {
    responseType: 'blob',
    params: { 'Filter.ConnectionGroupType': filterConnectionGroupType },
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, name);
};
