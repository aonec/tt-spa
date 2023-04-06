import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import {
  DialogText,
  FooterWrapper,
  StyledDialog,
  TitleText,
} from './Dialog.styled';
import { DialogProps } from './Dialog.types';

export const Dialog: FC<DialogProps> = ({
  isLoading,
  title,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  isOpen,
  type,
  description,
  footer,
  zIndex,
}) => {
  const btnText = submitText || 'Подтвердить';

  return (
    <StyledDialog
      title={
        <>
          <TitleText>{title}</TitleText>
          <DialogText>{description}</DialogText>
        </>
      }
      visible={isOpen}
      onOk={onSubmit}
      onCancel={onCancel}
      width={800}
      zIndex={zIndex}
      footer={
        footer || (
          <FooterWrapper>
            <Button type="ghost" key="back" onClick={onCancel}>
              {cancelText || 'Отмена'}
            </Button>
            <Button onClick={onSubmit} isLoading={isLoading} type={type}>
              {btnText}
            </Button>
          </FooterWrapper>
        )
      }
    />
  );
};
