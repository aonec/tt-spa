import { CalculatorAnalysisType } from 'services/statistics/connectionAnalysisService/connectionAnalysisService.types';

export type Props = {
  device: CalculatorAnalysisType;
  handlePing: (payload: number) => void;
};
