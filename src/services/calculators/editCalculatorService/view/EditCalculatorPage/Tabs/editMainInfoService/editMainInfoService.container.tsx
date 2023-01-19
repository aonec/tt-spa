import React, { FC } from 'react';
import { EditMainInfo } from './view/EditMainInfo';
import { EditMainInfoContainerProps } from './editMainInfoService.types';
import { useStore } from 'effector-react';
import { editMainInfoService } from './editMainInfoService.model';

const { inputs, outputs, gates } = editMainInfoService;
const { CalculatorInfosGate } = gates;

export const EditMainInfoContainer: FC<EditMainInfoContainerProps> = ({
  calculator,
  onCancel,
}) => {
  const calculatorTypesSelectItems = useStore(
    outputs.$calculatorTypesSelectItems
  );

  return (
    <>
      <CalculatorInfosGate />
      <EditMainInfo calculator={calculator} onCancel={onCancel} calculatorTypesSelectItems={calculatorTypesSelectItems} />
    </>
  );
};
