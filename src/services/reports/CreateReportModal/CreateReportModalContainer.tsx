import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import React from 'react';
import { CreateReportModal } from './CreateReportsModal';
import { form, inputs, outputs } from './models';

export const CreateReportModalContainer = () => {
  const $isModalOpen = outputs.$isModalOpen;
  const $loading = outputs.$loading;

  const { closeModalButonClicked, isOpen, loading } = useUnit({
    isOpen: $isModalOpen,
    loading: $loading,
    closeModalButonClicked: inputs.closeModalButonClicked,
  });

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
