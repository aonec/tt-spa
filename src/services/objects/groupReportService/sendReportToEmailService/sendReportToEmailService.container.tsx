import { Form } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { sendReportToEmailService } from './sendReportToEmailService.model';
import {
  ButtonsWrapper,
  Description,
  EmailTextWrapper,
  FooterWrapper,
} from './sendReportToEmailService.styled';

const { inputs, outputs } = sendReportToEmailService;

export const SendReportToEmailContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const setEmailIsOpen = useStore(outputs.$isOpenSetEmail);
  const defaultEmail = useStore(outputs.$defaultEmail);

  const handleClose = useEvent(inputs.closeModal);
  const submitEmail = useEvent(inputs.submitEmail);
  const handleOpenSetEmailModal = useEvent(inputs.openSetEmailModal);
  const handleCloseSetEmailModal = useEvent(inputs.closeSetEmailModal);
  const setEmail = useEvent(inputs.setEmail);

  const formId = 'set-another-email-to-group-report';

  return (
    <>
      <FormModal
        visible={setEmailIsOpen}
        form={
          <Form id={formId}>
            <FormItem label="Email">
              <Input
                value={defaultEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormItem>
          </Form>
        }
        title="Новая почта для отправки отчёта"
        formId={formId}
        onCancel={() => handleCloseSetEmailModal()}
        onSubmit={() => submitEmail()}
        submitBtnText="Отправить отчёт"
      />

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
              Объём данных слишком большой для прямого скачивания. Мы отправим
              вам архив с отчётом на почту, которую вы указали при регистрации
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
              <Button onClick={() => handleOpenSetEmailModal()} type="ghost">
                Указать другую почту
              </Button>
              <Button onClick={() => submitEmail()} type="default">
                Отправить отчёт
              </Button>
            </ButtonsWrapper>
          </FooterWrapper>
        }
      />
    </>
  );
};
