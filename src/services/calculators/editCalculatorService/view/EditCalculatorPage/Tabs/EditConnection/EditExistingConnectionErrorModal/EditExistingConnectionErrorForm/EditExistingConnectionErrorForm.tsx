import React, { FC } from 'react';
import {
  CalculatorBlock,
  Description,
  Model,
  Number,
  Wrapper,
} from './EditExistingConnectionErrorForm.styled';
import { EditExistingConnectionErrorFormProps } from './EditExistingConnectionErrorForm.types';
import { useHistory } from 'react-router-dom';

export const EditExistingConnectionErrorForm: FC<EditExistingConnectionErrorFormProps> = ({
  sameConnectionCalculator,
  handleCloseModal,
  clearCalculatorStore,
}) => {
  const history = useHistory();

  return (
    <Wrapper>
      <Description>
        Пожалуйста, удалите существующее устройство, либо создайте новое
        устройство с другими настройками соединения
      </Description>

      <CalculatorBlock>
        <Model
          onClick={() => {
            sameConnectionCalculator?.id &&
              history.push(`/calculators/${sameConnectionCalculator?.id}/edit`);
            handleCloseModal();
            clearCalculatorStore();
          }}
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
