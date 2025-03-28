import { axios } from 'api/axios';
import {
  CalculatorsSortedListApi,
  DownloadParams,
} from './connectionAnalysisService.types';
import { downloadURI } from 'utils/downloadByURL';
import { createQuery } from '@farfetched/core';

export const getCalculatorsQuery = createQuery<
  [
    payload: {
      pageNumber: number;
      filterConnectionGroupType?: string;
    },
  ],
  CalculatorsSortedListApi
>({
  handler: (payload) =>
    axios.get('CalculatorsStatistics', {
      params: {
        pageSize: 30,
        pageNumber: payload.pageNumber,
        ['Filter.ConnectionGroupType']: payload.filterConnectionGroupType,
      },
    }),
});

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
