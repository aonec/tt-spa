import { CalculatorResponse } from 'myApi';

export type EditMainInfoContainerProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
};
