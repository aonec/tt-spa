import { CalculatorResponse } from 'api/types';
import { EditMainInfoFormType } from 'services/calculators/editCalculatorService/editCalculatorService.types';

interface ItemInterface {
  id: number;
  value: number;
  model: string;
  label: string;
}

export type EditMainInfoProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
  calculatorTypesSelectItems: ItemInterface[];
  form: EditMainInfoFormType;
};
