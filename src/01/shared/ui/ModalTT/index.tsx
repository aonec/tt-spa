import React, { ReactNode } from 'react';
import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { Loader } from '01/components';

interface Props {
  width?: number;
  visible: boolean;
  onCancel?(): void;
  title: string | ReactNode;
  saveBtnText?: string;
  loading?: boolean;
  onSubmit?(): void;
  customSubmit?: ReactNode;
  centered?: boolean;
  footer?: ReactNode;
  customCancelButton?(): void;
  disabled?: boolean;
  saveButtonType?: 'blue' | 'red';
}

export const ModalTT: React.FC<Props> = (props) => {
  const {
    width,
    visible,
    onCancel,
    title,
    children,
    loading,
    onSubmit,
    saveBtnText,
    customSubmit,
    centered,
    footer,
    customCancelButton,
    disabled,
    saveButtonType,
  } = props;

  const text = saveBtnText || 'Сохранить';

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={width || 800}
      title={<Header>{title}</Header>}
      centered={centered}
      footer={
        footer || (
          <Footer>
            <ButtonTT
              color={'white'}
              key="back"
              onClick={customCancelButton || onCancel}
            >
              Отмена
            </ButtonTT>
            {customSubmit || (
              <ButtonTT
                color={saveButtonType || 'blue'}
                key="submit"
                onClick={onSubmit}
                disabled={loading || disabled}
              >
                {loading ? <Loader show /> : text}
              </ButtonTT>
            )}
          </Footer>
        )
      }
    >
      <ModalText>{children}</ModalText>
    </StyledModal>
  );
};
