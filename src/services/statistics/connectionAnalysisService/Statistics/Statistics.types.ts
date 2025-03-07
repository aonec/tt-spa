import { CalculatorsSortedList } from '../connectionAnalysisService.types';

export type Props = {
  calculatorsSortedList: CalculatorsSortedList | null;
  isLoading: boolean;
  handlePing: (payload: number) => void;
};
