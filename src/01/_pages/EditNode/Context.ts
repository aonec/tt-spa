import { createContext, Dispatch, SetStateAction } from 'react';
import { CalculatorResponse, NodeResponse } from '../../../myApi';

export interface EditNodeContextInterface {
  some?: string;
  visibleAddDevice?: boolean;
  setVisibleAddDevice?: Dispatch<SetStateAction<boolean>>;
  node?: NodeResponse;
}

export const EditNodeContext = createContext<EditNodeContextInterface>({});
