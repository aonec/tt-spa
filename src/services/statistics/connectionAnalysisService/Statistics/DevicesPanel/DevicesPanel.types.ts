import {
  CalculatorAnalysisType,
  ConnectionStatuses,
} from '../../connectionAnalysisService.types';

export type Props = {
  panelTitle: ConnectionStatuses;
  calculators: CalculatorAnalysisType[];
};
