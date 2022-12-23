import { Loader } from '01/components';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { DialogText, StyledDialog, TitleText } from './Dialog.styled';
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
          <>
            <Button type="ghost" key="back" onClick={onCancel}>
              {cancelText || 'Отмена'}
            </Button>
            <Button onClick={onSubmit} disabled={isLoading} type={type}>
              {isLoading ? <Loader show /> : btnText}
            </Button>
          </>
        )
      }
    />
  );
};
