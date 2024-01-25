import React, { useMemo } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { editApartmentActService } from './editApartmentActService.model';
import { EditApartmentActForm } from './view/EditApartmentActForm';
import { useUnit } from 'effector-react';

const { inputs, outputs, forms } = editApartmentActService;
const formId = 'edit-apartment-document';

export const EditApartmentActModalContainer = () => {
  const { handleClose, handleDeleteAct, initialValues, isLoading, isOpen } =
    useUnit({
      isOpen: outputs.$isModalOpen,
      isLoading: outputs.$editActIsLoading,
      initialValues: outputs.$act,
      handleClose: inputs.closeModal,
      handleDeleteAct: inputs.deleteActDocument,
    });

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
