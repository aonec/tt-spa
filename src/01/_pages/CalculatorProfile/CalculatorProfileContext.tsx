import React, { Dispatch, SetStateAction } from 'react';
import { CalculatorResponse, TaskListResponse } from '.../../api/types';

export interface CalculatorProfileContextInterface {
  device?: CalculatorResponse | null;
  deregister?: boolean;
  setDeregister?: Dispatch<SetStateAction<boolean>>;
  report?: boolean;
  setReport?: Dispatch<SetStateAction<boolean>>;
  check?: boolean;
  setCheck?: Dispatch<SetStateAction<boolean>>;
  tasks?: TaskListResponse[] | null;
}

export const CalculatorProfileContext = React.createContext<CalculatorProfileContextInterface>(
  {}
);
