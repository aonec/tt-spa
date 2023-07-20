import { CalculatorResponse } from 'api/myApi';

export type EditExistingConnectionErrorModalProps = {
  sameConnectionCalculator: CalculatorResponse | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};
