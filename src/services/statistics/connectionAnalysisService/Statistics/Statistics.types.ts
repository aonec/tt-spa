import {
  CalculatorsSortedListApi,
  DownloadParams,
} from '../connectionAnalysisService.types';

export type Props = {
  calculatorsSortedList: CalculatorsSortedListApi | null;
  isLoading: boolean;
  handlePing: (payload: number) => void;
  handleDownload: (payload: DownloadParams) => void;
  isDownloading: boolean;
  pageNumber: number;
  setPageNumber: (payload: number) => void;
};
