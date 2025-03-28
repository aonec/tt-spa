import {
  CalculatorConnectionStatisticsResponsePagedList,
  ECalculatorConnectionGroupType,
} from 'api/types';
import { DownloadParams } from '../../connectionAnalysisService.types';

export type Props = {
  panelTitle: ECalculatorConnectionGroupType;
  calculators: CalculatorConnectionStatisticsResponsePagedList | null;
  handleDownload: (payload: DownloadParams) => void;
  isDownloading: boolean;
  pageNumber: number;
  setPageNumber: (payload: number) => void;
  handlePing: (payload: number) => void;
};
