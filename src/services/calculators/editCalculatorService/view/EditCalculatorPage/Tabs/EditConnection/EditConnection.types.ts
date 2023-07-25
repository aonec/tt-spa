import { CalculatorResponse, UpdateCalculatorRequest } from 'api/types';

export type EditConnectionProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
  onSubmit: (payload: UpdateCalculatorRequest) => void;
  sameConnectionCalculator: CalculatorResponse | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
};
