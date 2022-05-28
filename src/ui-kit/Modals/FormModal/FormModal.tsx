import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { Loader } from '01/_components/Loader';
import { Form } from 'antd';
import React, { ReactNode } from 'react';
import { FormModalProps } from './formModal.types';

export const FormModal: React.FC<FormModalProps> = ({
  width,
  visible,
  onCancel,
  title,
  children,
  loading,
  onSubmit,
  submitBtnText = 'Подтвердить',
  DefaultModalSubmitButton,
  centered,
  footer,
  disabled,
  submitButtonType = 'blue',
  cancelBtnText = 'Отмена',
  formId,
  form,
}) => {
  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={width || 800}
      title={<Header>{title}</Header>}
      centered={centered}
      destroyOnClose
      footer={
        footer || (
          <Footer>
            <ButtonTT color={'white'} key="back" onClick={onCancel}>
              {cancelBtnText}
            </ButtonTT>
            {DefaultModalSubmitButton || (
              <ButtonTT
                color={submitButtonType}
                key="submit"
                type="submit"
                form={formId}
                onClick={onSubmit}
                disabled={loading || disabled}
              >
                {loading ? <Loader show /> : submitBtnText}
              </ButtonTT>
            )}
          </Footer>
        )
      }
    >
      <ModalText>{children}</ModalText>
      {form}
    </StyledModal>
  );
};
