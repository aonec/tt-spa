import { CalculatorConnectionStatisticsResponsePagedList } from 'api/types';
import { ConnectionStatuses } from '../../connectionAnalysisService.types';

export type Props = {
  panelTitle: ConnectionStatuses;
  calculators: CalculatorConnectionStatisticsResponsePagedList | null;
};
