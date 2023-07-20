import { CalculatorResponse, UpdateCalculatorRequest } from 'api/myApi';

export type EditConnectionProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
  onSubmit: (payload: UpdateCalculatorRequest) => void;
  sameConnectionCalculator: CalculatorResponse | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
};
