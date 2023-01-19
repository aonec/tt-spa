import { ItemInterface } from '01/tt-components/localBases';
import { CalculatorResponse } from 'myApi';

export type EditMainInfoProps = {
  calculator: CalculatorResponse | null;
  onCancel: () => void;
  calculatorTypesSelectItems: ItemInterface[];
};
