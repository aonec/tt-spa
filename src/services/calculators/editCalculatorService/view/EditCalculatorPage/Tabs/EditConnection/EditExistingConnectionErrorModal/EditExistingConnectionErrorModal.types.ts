import { CalculatorResponse } from 'myApi';

export type EditExistingConnectionErrorModalProps = {
  sameConnectionCalculator: CalculatorResponse | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  clearCalculatorStore: () => void;
};
