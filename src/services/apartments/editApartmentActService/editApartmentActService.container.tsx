import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { editApartmentActService } from './editApartmentActService.model';
import { EditApartmentActForm } from './view/EditApartmentActForm';

const { inputs, outputs, forms } = editApartmentActService;
const formId = 'edit-apartment-document';

export const EditApartmentActModalContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$editActIsLoading);
  const initialValues = useStore(outputs.$act);

  const handleClose = useEvent(inputs.closeModal);

  const handleDeleteAct = useEvent(inputs.deleteActDocument);

  const form = useMemo(
    () => (
      <EditApartmentActForm
        formId={formId}
        handleDeleteAct={() => handleDeleteAct()}
        initialValues={initialValues}
        form={forms.editActForm}
      />
    ),
    [initialValues, handleDeleteAct],
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
