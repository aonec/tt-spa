import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { sendReportToEmailService } from './sendReportToEmailService.model';

const { inputs, outputs } = sendReportToEmailService;

export const SendReportToEmailContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const defaultEmail = useStore(outputs.$defaultEmail);

  const handleClose = useEvent(inputs.closeModal);
  const submitEmail = useEvent(inputs.submitEmail);

  return (
    <Dialog
      title={'Отправить отчёт на почту'}
      submitText="Отправить отчёт"
      isOpen={isOpen}
      onCancel={handleClose}
      onSubmit={submitEmail}
      type="success"
      description={`Объём данных слишком большой для прямого скачивания. Мы отправим вам архив с отчётом на почту, которую вы указали при регистрации ${defaultEmail}`}
    />
  );
};
