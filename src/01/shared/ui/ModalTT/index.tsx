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
  visible: boolean;
  onCancel?(): void;
  title: string | ReactNode;
  saveBtnText?: string;
  loading?: boolean;
  onSubmit?(): void;
  customSubmit?: ReactNode;
}

export const ModalTT: React.FC<Props> = (props) => {
  const {
    visible,
    onCancel,
    title,
    children,
    loading,
    onSubmit,
    saveBtnText,
    customSubmit,
  } = props;

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={800}
      title={<Header>{title}</Header>}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          {customSubmit || (
            <ButtonTT
              color="blue"
              key="submit"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? <Loader show /> : saveBtnText || 'Сохранить'}
            </ButtonTT>
          )}
        </Footer>
      }
    >
      <ModalText>{children}</ModalText>
    </StyledModal>
  );
};
