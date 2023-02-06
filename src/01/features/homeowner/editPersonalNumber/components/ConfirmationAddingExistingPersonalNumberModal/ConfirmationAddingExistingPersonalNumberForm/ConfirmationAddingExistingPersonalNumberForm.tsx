import React, { FC } from 'react';
import { LinkSC } from './ConfirmationAddingExistingPersonalNumberForm.styled';
import { ConfirmationAddingExistingPersonalNumberFormProps } from './ConfirmationAddingExistingPersonalNumberForm.types';

export const ConfirmationAddingExistingPersonalNumberForm: FC<
  ConfirmationAddingExistingPersonalNumberFormProps
> = ({ samePersonalAccountNumderId }) => {
  return (
      <LinkSC
        to={`/meters/apartments/${samePersonalAccountNumderId}`}
        target="_blank"
      >
        Квартира с таким же л\с: {samePersonalAccountNumderId}
      </LinkSC>
  );
};
