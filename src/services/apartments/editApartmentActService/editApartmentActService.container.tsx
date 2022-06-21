import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { editApartmentActService } from './editApartmentActService.models';
import { EditApartmentActForm } from './view/EditApartmentActForm';

const { inputs, outputs } = editApartmentActService;

export const EditApartmentActModalContainer = () => {

  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$editActIsLoading);
  const actTypes = useStore(outputs.$actTypes);
  const initialValues = useStore(outputs.$act);

  const handleClose = useEvent(inputs.closeModal);

  const handleSubmit = useEvent(inputs.editAct);
  const formId = 'edit-apartment-document';

  const form = useMemo(
    () => (
      <EditApartmentActForm
        formId={formId}
        handleSubmit={handleSubmit}
        actTypes={actTypes}
        initialValues={initialValues}
      />
    ),
    [initialValues]
  );
  return (
    <FormModal
      loading={isLoading}
      title="Редактировать акт"
      visible={isOpen}
      onCancel={() => handleClose()}
      submitBtnText="Сохранить изменения"
      formId={formId}
      form={form}
    />
  );
};
