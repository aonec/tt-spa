import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { IndividualDevicesReportArchiveQueryParams } from './readingReportsArchiveService.types';
import { PollResponsePagedList } from 'api/types';
import queryString from 'query-string';
import { downloadURI } from 'utils/downloadByURL';

export const individualDevicesReportArchiveQuery = createQuery<
  [IndividualDevicesReportArchiveQueryParams],
  PollResponsePagedList
>({
  handler: (params): Promise<PollResponsePagedList> =>
    axios.get(`Reports/IndividualDevicesReportArchives`, { params }),
});

export const downloadReportFile = async (pollId: number, name: string) => {
  const res: string = await axios.get(`Documents/poll/${pollId}/artifact`, {
    responseType: 'blob',
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });
  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, name, true);
};
