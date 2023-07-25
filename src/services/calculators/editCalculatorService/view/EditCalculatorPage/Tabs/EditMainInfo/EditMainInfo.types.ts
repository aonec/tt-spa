import { CalculatorResponse, UpdateCalculatorRequest } from 'api/types';

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
  onSubmit: (payload: UpdateCalculatorRequest) => void;
};
