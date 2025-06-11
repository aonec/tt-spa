import {
  CalculatorConnectionStatisticsResponsePagedList,
  ECalculatorConnectionGroupType,
} from 'api/types';
import {
  DownloadParams,
  PageNumberStoreType,
} from '../../connectionAnalysisService.types';

export type Props = {
  panelTitle: ECalculatorConnectionGroupType;
  calculators: CalculatorConnectionStatisticsResponsePagedList | null;
  handleDownload: (payload: DownloadParams) => void;
  isDownloading: boolean;
  pageNumbers: PageNumberStoreType;
  setPageNumber: (
    payload: Record<'Success' | 'NotPolling' | 'Error' | 'NoArchives', number>,
  ) => void;
  handlePing: (payload: number) => void;
};
