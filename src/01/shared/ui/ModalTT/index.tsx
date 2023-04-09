import React, { ReactNode, useMemo } from 'react';
import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from '01/shared/ui/Modal/Modal';
import { Button } from 'ui-kit/Button';
import { ButtonStyleType } from 'ui-kit/Button/Button.types';

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
  saveButtonType?: ButtonStyleType;
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
          <Button type="ghost" onClick={customCancelButton || onCancel}>
            {cancelBtnText}
          </Button>
          {customSubmit || (
            <Button
              type={saveButtonType}
              onClick={onSubmit}
              disabled={disabled}
              isLoading={loading}
            >
              {text}
            </Button>
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
