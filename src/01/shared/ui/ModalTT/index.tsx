import React, { ReactNode } from "react";

import { ButtonTT } from "../../../tt-components";
import { Loader } from "../../../components";
import { Footer, Header, ModalText, StyledModal } from "../Modal/Modal";

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
  saveButtonType?: "blue" | "red";
  children?: ReactNode;
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
    cancelBtnText = "Отмена",
  } = props;

  const text = saveBtnText || "Сохранить";

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
            <ButtonTT
              color={"white"}
              key="back"
              onClick={customCancelButton || onCancel}
            >
              {cancelBtnText}
            </ButtonTT>
            {customSubmit || (
              <ButtonTT
                color={saveButtonType || "blue"}
                key="submit"
                type="submit"
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
