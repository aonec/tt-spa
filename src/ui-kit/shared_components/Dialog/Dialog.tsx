import { Loader } from '01/components';
import { ButtonTT } from '01/tt-components';
import React, { FC } from 'react';
import { StyledDialog, TitleText } from './Dialog.styled';
import { BtnType, DialogProps } from './Dialog.types';

export const Dialog: FC<DialogProps> = ({
  isLoading,
  title,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  isOpen,
  type,
}) => {
  const btnText = submitText || 'Подтвердить';

  return (
    <StyledDialog
      title={<TitleText>{title}</TitleText>}
      visible={isOpen}
      onOk={onSubmit}
      onCancel={onCancel}
      width={800}
      footer={
        <>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            {cancelText || 'Отмена'}
          </ButtonTT>
          <ButtonTT
            color={BtnType[type]}
            key="submit"
            type="submit"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Loader show /> : btnText}
          </ButtonTT>
        </>
      }
    />
  );
};
