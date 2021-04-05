import { createContext, Dispatch, SetStateAction } from 'react';
import { CalculatorResponse, NodeResponse } from '../../../myApi';

export interface EditNodeContextInterface {
  some?: string;
  visibleAddDevice?: boolean;
  setVisibleAddDevice?: Dispatch<SetStateAction<boolean>>;
  calculator?: CalculatorResponse;
  node?: NodeResponse;
}

export const EditNodeContext = createContext<EditNodeContextInterface>({});
