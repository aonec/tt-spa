import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { editApartmentActService } from './editApartmentActService.model';
import { EditApartmentActForm } from './view/EditApartmentActForm';

const { inputs, outputs } = editApartmentActService;
const formId = 'edit-apartment-document';

export const EditApartmentActModalContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$editActIsLoading);
  const actTypes = useStore(outputs.$actTypes);
  const initialValues = useStore(outputs.$act);

  const handleClose = useEvent(inputs.closeModal);

  const handleDeleteAct = useEvent(inputs.deleteActDocument);
  const handleSubmit = useEvent(inputs.editAct);

  const form = useMemo(
    () => (
      <EditApartmentActForm
        formId={formId}
        handleSubmit={handleSubmit}
        handleDeleteAct={() => handleDeleteAct()}
        actTypes={actTypes}
        initialValues={initialValues}
      />
    ),
    [initialValues, actTypes, handleDeleteAct, handleSubmit],
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
