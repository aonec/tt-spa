import { CalculatorResponse } from 'api/types';
import {
  EditConnectionFormType,
  EditMainInfoFormType,
} from '../../editCalculatorService.types';

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
  isCalculatorLoading: boolean;
  sameConnectionCalculator: CalculatorResponse | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  editMainInfoForm: EditMainInfoFormType;
  editConnectionForm: EditConnectionFormType;
};

export enum EditCalculatorTabs {
  CommonInfo = 'CommonInfo',
  Connection = 'Connection',
  Documents = 'Documents',
}
