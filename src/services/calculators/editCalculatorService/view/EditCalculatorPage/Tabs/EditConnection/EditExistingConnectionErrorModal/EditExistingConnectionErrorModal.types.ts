import { CalculatorResponse } from 'api/types';

export type EditExistingConnectionErrorModalProps = {
  sameConnectionCalculator: CalculatorResponse | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};
