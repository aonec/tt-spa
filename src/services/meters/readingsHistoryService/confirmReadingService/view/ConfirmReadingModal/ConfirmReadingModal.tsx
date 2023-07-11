import React, { FC } from 'react';
import { ExclamationCircle } from 'react-bootstrap-icons';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Props } from './ConfirmReadingModal.types';
import {
  HeaderTitle,
  HeaderWrapper,
  TextWrap,
} from './ConfirmReadingModal.styled';

export const ConfirmReadingModal: FC<Props> = ({
  title,
  isOpen,
  executeCancelReading,
  executeConfirmReading,
}) => {
  const header = (
    <HeaderWrapper>
      <ExclamationCircle color="#ffac27" />
      <HeaderTitle>Подтвердите действие</HeaderTitle>
    </HeaderWrapper>
  );

  return (
    <FormModal
      formId="confirm-reading-value-modal"
      visible={isOpen}
      title={header}
      centered
      onCancel={executeCancelReading}
      onSubmit={executeConfirmReading}
      form={<TextWrap>{title}</TextWrap>}
    />
  );
};
