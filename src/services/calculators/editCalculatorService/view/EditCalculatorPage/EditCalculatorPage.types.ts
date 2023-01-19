import { ItemInterface } from '01/tt-components/localBases';
import { CalculatorResponse } from 'myApi';

export type EditCalculatorPageProps = {
  calculator: CalculatorResponse | null;
  currentTab: EditCalculatorTabs;
  handleChangeTab: (payload: EditCalculatorTabs) => void;
  calculatorTypesSelectItems: ItemInterface[]
};

export enum EditCalculatorTabs {
  CommonInfo = 'CommonInfo',
  Connection = 'Connection',
  Documents = 'Documents',
}
