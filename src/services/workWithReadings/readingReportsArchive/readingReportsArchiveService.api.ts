import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { IndividualDevicesReportArchiveQueryParams } from './readingReportsArchiveService.types';
import { PollResponsePagedList } from 'api/types';

export const individualDevicesReportArchiveQuery = createQuery<
  [IndividualDevicesReportArchiveQueryParams],
  PollResponsePagedList
>({
  handler: (params): Promise<PollResponsePagedList> =>
    axios.get(`Reports/IndividualDevicesReportArchives`, { params }),
});
