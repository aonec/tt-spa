import {
  CalculatorsSortedListApi,
  DownloadParams,
} from '../connectionAnalysisService.types';

export type Props = {
  calculatorsSortedList: CalculatorsSortedListApi | null;
  isLoading: boolean;
  handleDownload: (payload: DownloadParams) => void;
  isDownloading: boolean;
};
