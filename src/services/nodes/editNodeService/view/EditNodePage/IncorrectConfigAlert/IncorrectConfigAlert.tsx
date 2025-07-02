import { Alert } from 'ui-kit/Alert';
import React, { FC, useState } from 'react';
import {
  ErrorContentWrapper,
  TextWrapper,
  WarningsList,
} from './IncorrectConfigAlert.styled';
import { IncorrectConfigAlertProps } from './IncorrectConfigAlert.types';

export const IncorrectConfigAlert: FC<IncorrectConfigAlertProps> = ({
  validationResultArray,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Alert type="danger" icon="incorrect">
      <ErrorContentWrapper>
        <span>{description}</span>

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
