import { CalculatorResponse, UpdateCalculatorRequest } from 'myApi';

interface ItemInterface {
  id: number;
  value: number;
  model: string;
  label: string;
}

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
