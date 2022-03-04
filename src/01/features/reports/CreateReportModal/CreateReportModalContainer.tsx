import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import { CreateReportModal } from './CreateReportsModal';
import { form, inputs, outputs } from './models';

export const CreateReportModalContainer = () => {
  const { $isModalOpen, $loading } = outputs;
  const { closeModalButonClicked } = inputs;
  const isOpen = useStore($isModalOpen);

  const { submit } = useForm(form);

  const loading = useStore($loading);

  return (
    <CreateReportModal
      isOpen={isOpen}
      onHide={closeModalButonClicked}
      onSave={submit}
      loading={loading}
    />
  );
};
