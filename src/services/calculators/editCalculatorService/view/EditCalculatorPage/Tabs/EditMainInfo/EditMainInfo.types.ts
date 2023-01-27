import { ItemInterface } from '01/tt-components/localBases';
import { CalculatorResponse, UpdateCalculatorRequest } from 'myApi';

export type EditMainInfoProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
  calculatorTypesSelectItems: ItemInterface[];
  onSubmit: (payload: UpdateCalculatorRequest) => void;
};
