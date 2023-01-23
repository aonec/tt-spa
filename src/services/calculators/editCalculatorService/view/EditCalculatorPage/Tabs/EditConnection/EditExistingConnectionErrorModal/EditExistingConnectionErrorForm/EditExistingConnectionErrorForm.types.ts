import { CalculatorResponse } from 'myApi';

export type EditExistingConnectionErrorFormProps = {
  handleCloseModal: () => void;
  sameConnectionCalculator: CalculatorResponse | null;
  clearCalculatorStore: () => void;
};
