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
  type = 'primary',
  description,
  footer,
  zIndex,
  children,
  isDisabled,
  width = 800,
}) => {
  const btnText = submitText || 'Подтвердить';

  return (
    <StyledDialog
      title={
        <>
          <TitleText>{title}</TitleText>
          <DialogText>{description}</DialogText>
          {children}
        </>
      }
      open={isOpen}
      onOk={onSubmit}
      onCancel={onCancel}
      width={width}
      zIndex={zIndex}
      centered
      footer={
        footer || (
          <FooterWrapper>
            <Button type="ghost" key="back" onClick={onCancel}>
              {cancelText || 'Отмена'}
            </Button>
            <Button
              onClick={onSubmit}
              isLoading={isLoading}
              disabled={isDisabled}
              type={type}
            >
              {btnText}
            </Button>
          </FooterWrapper>
        )
      }
    />
  );
};
