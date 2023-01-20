import { CalculatorResponse, UpdateCalculatorRequest } from 'myApi';

export type EditConnectionProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
  onSubmit: (payload: UpdateCalculatorRequest) => void;
};
