import { FC } from 'react';
import { Props } from './CreateHouseManagementModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CreateHouseManagementForm } from './CreateHouseManagementForm';
import { useFormik } from 'formik';

const formId = 'create-new-house-management-form';

export const CreateHouseManagementModal: FC<Props> = ({
  handleCloseModal,
  isModalOpen,
  handleCreateHouseManagement,
}) => {
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: { name: null },
    onSubmit: (data) => {
      handleCreateHouseManagement({ name: data.name });
    },
  });

  return (
    <FormModal
      title="Добавление нового домоуправления"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={
        <CreateHouseManagementForm
          formId={formId}
          values={values}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
        />
      }
      formId={formId}
      submitBtnText="Добавить"
      disabled={!values.name}
    />
  );
};
