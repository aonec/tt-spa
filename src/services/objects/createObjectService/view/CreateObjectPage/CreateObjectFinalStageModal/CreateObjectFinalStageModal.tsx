import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { Wrapper } from './CreateObjectFinalStageModal.styled';
import { CreateObjectFinalStageModalProps } from './CreateObjectFinalStageModal.types';
import { CreateObjectFinalStageForm } from './CreateObjectFinalStageForm/CreateObjectFinalStageForm';

export const CreateObjectFinalStageModal: FC<
  CreateObjectFinalStageModalProps
> = ({
  createObjectData,
  houseManagements,
  handlePostCreateObject,
  heatingStations,
  closePreviewModal,
  isPreviewModalOpen,
}) => {
  const formId = 'create-object-final-stage-form';
  return (
    <Wrapper>
      <FormModal
        title="Добавление нового объекта"
        visible={isPreviewModalOpen}
        onCancel={closePreviewModal}
        onSubmit={handlePostCreateObject}
        form={
          <CreateObjectFinalStageForm
            formId={formId}
            createObjectData={createObjectData}
            houseManagements={houseManagements}
            heatingStations={heatingStations}
          />
        }
        formId={formId}
        submitBtnText="Создать объект"
      />
    </Wrapper>
  );
};
