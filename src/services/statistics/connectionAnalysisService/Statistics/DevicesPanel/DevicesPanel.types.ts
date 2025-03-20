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
  handlePing: (payload: number) => void;
};
