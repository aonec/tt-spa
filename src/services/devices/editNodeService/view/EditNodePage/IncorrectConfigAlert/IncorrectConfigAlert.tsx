import { Alert } from '01/shared/ui/Alert';
import React, { FC, useState } from 'react';
import {
  ErrorContentWrapper,
  TextWrapper,
  WarningsList,
} from './IncorrectConfigAlert.styled';
import { IncorrectConfigAlertProps } from './IncorrectConfigAlert.types';

export const IncorrectConfigAlert: FC<IncorrectConfigAlertProps> = ({
  validationResultArray,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Alert type="incorrect" color="FC525B">
      <ErrorContentWrapper>
        <span>
          Данные с вычислителя не обрабатываются, так как узел не соответствует
          выбранной конфигурации. Исправьте следующие ошибки:
        </span>

        {!isOpen && (
          <TextWrapper onClick={() => setIsOpen(true)}>Показать</TextWrapper>
        )}
        {isOpen && (
          <>
            <WarningsList>
              {validationResultArray.map((warning) => (
                <li key={warning.value}>{warning.value}</li>
              ))}
            </WarningsList>
            <TextWrapper onClick={() => setIsOpen(false)}>Скрыть</TextWrapper>
          </>
        )}
      </ErrorContentWrapper>
    </Alert>
  );
};
