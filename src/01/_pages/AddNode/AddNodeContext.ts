import React from 'react';

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
