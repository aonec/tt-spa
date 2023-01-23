import { ItemInterface } from '01/tt-components/localBases';
import { CalculatorResponse, UpdateCalculatorRequest } from 'myApi';

export type EditCalculatorPageProps = {
  calculator: CalculatorResponse | null;
  currentTab: EditCalculatorTabs;
  handleChangeTab: (payload: EditCalculatorTabs) => void;
  calculatorTypesSelectItems: ItemInterface[];
  handleSubmit: (payload: UpdateCalculatorRequest) => void;
  isCalculatorLoading: boolean;
  sameConnectionCalculator: CalculatorResponse | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
};

export enum EditCalculatorTabs {
  CommonInfo = 'CommonInfo',
  Connection = 'Connection',
  Documents = 'Documents',
}
