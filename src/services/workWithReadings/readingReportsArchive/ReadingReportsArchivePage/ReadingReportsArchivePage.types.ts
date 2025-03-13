import { PollResponsePagedList } from 'api/types';
import { IndividualDevicesReportArchiveQueryParams } from '../readingReportsArchiveService.types';

export type Props = {
  individualDevicesReportArchiveData: PollResponsePagedList | null;
  isLoadingIndividualDevicesReportArchive: boolean;
  setQueryParams: (payload: IndividualDevicesReportArchiveQueryParams) => void;
  queryParams: IndividualDevicesReportArchiveQueryParams;
};
