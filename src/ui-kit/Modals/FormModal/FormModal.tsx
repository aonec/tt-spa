import React, { useMemo } from 'react';
import { Footer, Header, ModalText, StyledModal } from './FormModal.styled';
import { Loader } from '01/_components/Loader';
import { FormModalProps } from './formModal.types';
import { Button } from 'ui-kit/Button';

const defaultInnerProps = {
  width: 800,
  destroyOnClose: true,
  centered: true,
};

export const FormModal: React.FC<FormModalProps> = ({
  innerModalProps = {},
  visible,
  onCancel,
  title,
  loading,
  onSubmit,
  submitBtnText = 'Подтвердить',
  customSubmit,
  customFooter,
  disabled,
  cancelBtnText = 'Отмена',
  formId,
  form,
  description,
  submitButtonType,
}) => {
  const onSubmitButtonClick = () => {
    if (onSubmit) {
      onSubmit();
    }
    if (formId) {
      const formNode = document.getElementById(
        formId
      ) as HTMLFormElement | null;

      if (formNode?.requestSubmit) {
        formNode.requestSubmit();
      }
    }
  };

  const DefaultModalSubmitButton = (
    <Button
      key="submit"
      onClick={onSubmitButtonClick}
      disabled={loading || disabled}
      type={submitButtonType}
    >
      {loading ? <Loader show /> : submitBtnText}
    </Button>
  );

  const DefaultModalFooter = (
    <Footer>
      <Button type="ghost" key="back" onClick={onCancel}>
        {cancelBtnText}
      </Button>
      {customSubmit || DefaultModalSubmitButton}
    </Footer>
  );

  const innerProps = useMemo(() => {
    return {
      ...defaultInnerProps,
      ...innerModalProps,
    };
  }, [innerModalProps]);

  return (
    <StyledModal
      {...innerProps}
      visible={visible}
      onCancel={onCancel}
      title={<Header>{title}</Header>}
      footer={customFooter || DefaultModalFooter}
    >
      <ModalText>{description}</ModalText>
      {form}
    </StyledModal>
  );
};
