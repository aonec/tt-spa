import { CalculatorResponse } from 'myApi';

export type EditMainInfoProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
};
