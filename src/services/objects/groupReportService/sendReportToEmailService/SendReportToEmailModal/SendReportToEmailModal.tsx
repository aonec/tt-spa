import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { SendReportToEmailDescription } from './SendReportToEmailDescription';
import { ButtonsWrapper, FooterWrapper } from './SendReportToEmailModal.styled';
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
      zIndex={1001}
      description={<SendReportToEmailDescription email={defaultEmail} />}
      footer={
        <FooterWrapper>
          <Button type="ghost" key="back" onClick={() => handleClose()}>
            Отмена
          </Button>
          <ButtonsWrapper>
            <Button onClick={handleOpenSetEmailModal} type="ghost">
              Указать другую почту
            </Button>
            <Button onClick={submitEmail}>Отправить отчёт</Button>
          </ButtonsWrapper>
        </FooterWrapper>
      }
    />
  );
};
