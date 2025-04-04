import { CalculatorConnectionStatisticsResponse } from 'api/types';

export type Props = {
  handlePing: (payload: number) => void;
  device: CalculatorConnectionStatisticsResponse;
};
