import { CalculatorResponse } from 'api/types';
import { EditConnectionFormType } from 'services/calculators/editCalculatorService/editCalculatorService.types';

export type EditConnectionProps = {
  onCancel: () => void;
  sameConnectionCalculator: CalculatorResponse | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  form: EditConnectionFormType;
};
