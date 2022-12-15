import React, { FC } from 'react';
import { Wrapper } from './ConfirmationAddingExistingPersonalNumberForm.styled';
import { ConfirmationAddingExistingPersonalNumberFormProps } from './ConfirmationAddingExistingPersonalNumberForm.types';

export const ConfirmationAddingExistingPersonalNumberForm: FC<ConfirmationAddingExistingPersonalNumberFormProps> = ({}) => {
  return (
    <Wrapper>
      <h3> Квартира с таким же л\с: </h3>
    </Wrapper>
  );
};
