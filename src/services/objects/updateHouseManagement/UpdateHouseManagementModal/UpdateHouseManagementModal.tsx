import { FC } from 'react';
import { Props } from './UpdateHouseManagementModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useFormik } from 'formik';
import { UpdateHouseManagementForm } from './UpdateHouseManagementForm';

const formId = 'update-new-house-management-form';

export const UpdateHouseManagementModal: FC<Props> = ({
  handleCloseModal,
  handleUpdateHouseManagement,
  isModalOpen,
  initialValues,
}) => {
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: { name: initialValues?.name },
    enableReinitialize: true,
    onSubmit: () => {
      handleUpdateHouseManagement({
        houseManagementId: initialValues?.id || '',
        requestPayload: {},
      });
    },
  });

  return (
    <FormModal
      title="Редактирование домоуправления"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={
        <UpdateHouseManagementForm
          formId={formId}
          values={values}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
        />
      }
      formId={formId}
      submitBtnText="Сохранить изменения"
      disabled={!values.name}
    />
  );
};
