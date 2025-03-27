import {
  CalculatorsSortedListApi,
  DownloadParams,
  PageNumberStoreType,
} from '../connectionAnalysisService.types';

export type Props = {
  calculatorsSortedList: CalculatorsSortedListApi | null;
  isLoading: boolean;
  handlePing: (payload: number) => void;
  handleDownload: (payload: DownloadParams) => void;
  isDownloading: boolean;
  pageNumbers: PageNumberStoreType;
  setPageNumber: (
    payload: Record<'Success' | 'NotPolling' | 'Error' | 'NoArchives', number>,
  ) => void;
};
