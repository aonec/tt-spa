import React, { FC } from 'react';
import {
  CalculatorBlock,
  Description,
  Model,
  Number,
  Wrapper,
} from './EditExistingConnectionErrorForm.styled';
import { EditExistingConnectionErrorFormProps } from './EditExistingConnectionErrorForm.types';

export const EditExistingConnectionErrorForm: FC<
  EditExistingConnectionErrorFormProps
> = ({ sameConnectionCalculator }) => {
  return (
    <Wrapper>
      <Description>
        Пожалуйста, удалите существующее устройство, либо создайте новое
        устройство с другими настройками соединения
      </Description>

      <CalculatorBlock>
        <Model
          to={`/calculators/${sameConnectionCalculator?.id}`}
          target="_blank"
        >
          {sameConnectionCalculator?.model || 'Модель не указана'}
        </Model>
        <Number>
          (
          {sameConnectionCalculator?.serialNumber || 'Серийный номер не указан'}
          )
        </Number>
      </CalculatorBlock>
    </Wrapper>
  );
};
