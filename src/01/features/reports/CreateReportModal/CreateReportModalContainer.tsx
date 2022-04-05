import { useForm } from 'effector-forms/dist';
import { useStore, useEvent } from 'effector-react';
import React from 'react';
import { CreateReportModal } from './CreateReportsModal';
import { form, inputs, outputs } from './models';

export const CreateReportModalContainer = () => {
  const $isModalOpen = outputs.$isModalOpen;
  const $loading = outputs.$loading;

  const isOpen = useStore($isModalOpen);
  const loading = useStore($loading);

  const closeModalButonClicked = useEvent(inputs.closeModalButonClicked);

  const { submit } = useForm(form);

  return (
    <CreateReportModal
      isOpen={isOpen}
      onHide={() => closeModalButonClicked()}
      onSave={submit}
      loading={loading}
    />
  );
};
