import React, { useMemo } from 'react';

import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from './FormModal.styled';
import { ButtonTT } from '01/tt-components';
import { Loader } from '01/_components/Loader';
import { FormModalProps } from './formModal.types';

const defaultInnerProps = {
  width: 800,
}

export const FormModal: React.FC<FormModalProps> = ({
  innerModalProps,
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

  const innerProps = useMemo(() => {
    return {
      ...defaultInnerProps,
      ...innerModalProps,
    }
  }, [innerModalProps]);

  return (
    <StyledModal
      {...innerProps}
      visible={visible}
      onCancel={onCancel}
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
