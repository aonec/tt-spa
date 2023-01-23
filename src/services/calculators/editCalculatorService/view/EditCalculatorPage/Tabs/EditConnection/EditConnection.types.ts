import { CalculatorResponse, UpdateCalculatorRequest } from 'myApi';

export type EditConnectionProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
  onSubmit: (payload: UpdateCalculatorRequest) => void;
  sameConnectionCalculator: CalculatorResponse | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  clearCalculatorStore: () => void;
};
