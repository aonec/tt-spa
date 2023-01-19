import { CalculatorResponse } from 'myApi';

export type EditCalculatorPageProps = {
  calculator: CalculatorResponse | null;
  currentTab: EditCalculatorTabs;
  handleChangeTab: (payload: EditCalculatorTabs) => void;
};

export enum EditCalculatorTabs {
  CommonInfo = 'CommonInfo',
  Connection = 'Connection',
  Documents = 'Documents',
}
