import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from './FormModalStyles';
import { ButtonTT } from '01/tt-components';
import { Loader } from '01/_components/Loader';
import React from 'react';
import { FormModalProps } from './formModal.types';

export const FormModal: React.FC<FormModalProps> = ({
  width = 800,
  visible,
  onCancel,
  title,
  loading,
  onSubmit,
  submitBtnText = 'Подтвердить',
  customSubmit,
  centered,
  customFooter,
  disabled,
  submitButtonType = 'blue',
  cancelBtnText = 'Отмена',
  formId,
  form,
  description
}) => {
  
  const DefaultModalSubmitButton = (
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
  );

  const DefaultModalFooter = (
    <Footer>
      <ButtonTT color={'white'} key="back" onClick={onCancel}>
        {cancelBtnText}
      </ButtonTT>
      {customSubmit || DefaultModalSubmitButton}
    </Footer>
  );

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={width}
      title={<Header>{title}</Header>}
      centered={centered}
      destroyOnClose
      footer={customFooter || DefaultModalFooter}
    >
      <ModalText>{description}</ModalText>
      {form}
    </StyledModal>
  );
};
