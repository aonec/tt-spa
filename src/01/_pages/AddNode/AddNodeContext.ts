import React, { Dispatch, SetStateAction } from 'react';
import { CalculatorResponse, TaskListResponse } from '../../../myApi';

export interface AddNodeContextInterface {
  handleCancel?: any;
  currentTabKey?: any;
  setTab?: any;
  handleChangeTab?: any;
  handleNext?: any;
  node?: any;
  setNode?: any;
  housingStockId?: any;
  calculators?: any;
  addCalculator?: boolean;
  setAddCalculator?: any;
  addOdpu?: boolean;
  setAddOdpu?: any;
  calculatorsExtended?: any;
  communicationPipes?: any;
  setCommunicationPipes?: any;
  housingStock?: any;
  stepsArr?: any;
  isEmpty?: any;
  addNode?: any;
  setAddNode?: any;
}

export const AddNodeContext = React.createContext<AddNodeContextInterface>({});

// deregister?: boolean;
// setDeregister?: Dispatch<SetStateAction<boolean>>;
// report?: boolean;
// setReport?: Dispatch<SetStateAction<boolean>>;
// check?: boolean;
// setCheck?: Dispatch<SetStateAction<boolean>>;
// tasks?: TaskListResponse[] | null;
