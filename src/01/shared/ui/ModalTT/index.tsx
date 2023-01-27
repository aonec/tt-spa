import React, { ReactNode, useMemo } from 'react';
import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { Loader } from '01/_components/Loader';

interface Props {
  width?: number;
  visible: boolean;
  onCancel?(): void;
  title: string | ReactNode;
  saveBtnText?: string;
  cancelBtnText?: string;
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
    cancelBtnText = 'Отмена',
  } = props;

  const text = saveBtnText || 'Сохранить';

  const footerComponent = useMemo(() => {
    if (footer === null) {
      return null;
    }
    if (!footer) {
      return (
        <Footer>
          <ButtonTT
            color={'white'}
            key="back"
            onClick={customCancelButton || onCancel}
          >
            {cancelBtnText}
          </ButtonTT>
          {customSubmit || (
            <ButtonTT
              color={saveButtonType || 'blue'}
              key="submit"
              type="submit"
              onClick={onSubmit}
              disabled={loading || disabled}
            >
              {loading ? <Loader show /> : text}
            </ButtonTT>
          )}
        </Footer>
      );
    }
    return footer;
  }, [
    footer,
    onSubmit,
    loading,
    text,
    disabled,
    saveButtonType,
    customSubmit,
    cancelBtnText,
    customCancelButton,
    onCancel,
  ]);

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={width || 800}
      title={<Header>{title}</Header>}
      centered={centered}
      destroyOnClose
      footer={footerComponent}
    >
      <ModalText>{children}</ModalText>
    </StyledModal>
  );
};
