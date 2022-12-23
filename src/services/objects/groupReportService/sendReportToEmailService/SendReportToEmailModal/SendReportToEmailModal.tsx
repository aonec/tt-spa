import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import {
  ButtonsWrapper,
  Description,
  EmailTextWrapper,
  FooterWrapper,
} from './SendReportToEmailModal.styled';
import { SendReportToEmailModalProps } from './SendReportToEmailModal.types';

export const SendReportToEmailModal: FC<SendReportToEmailModalProps> = ({
  defaultEmail,
  handleOpenSetEmailModal,
  submitEmail,
  isOpen,
  handleClose,
}) => {
  return (
    <Dialog
      title={'Отправить отчёт на почту'}
      submitText="Отправить отчёт"
      isOpen={isOpen}
      onCancel={() => handleClose()}
      onSubmit={() => submitEmail()}
      type="default"
      description={
        <>
          <p>
            Объём данных слишком большой для прямого скачивания. Мы отправим вам
            архив с отчётом на почту, которую вы указали при регистрации
            <EmailTextWrapper>{defaultEmail}</EmailTextWrapper>
          </p>
          <Description>
            Вы можете указать другую почту для получения отчёта.
          </Description>
        </>
      }
      footer={
        <FooterWrapper>
          <Button type="ghost" key="back" onClick={() => handleClose()}>
            Отмена
          </Button>
          <ButtonsWrapper>
            <Button onClick={handleOpenSetEmailModal} type="ghost">
              Указать другую почту
            </Button>
            <Button onClick={submitEmail} type="default">
              Отправить отчёт
            </Button>
          </ButtonsWrapper>
        </FooterWrapper>
      }
    />
  );
};
