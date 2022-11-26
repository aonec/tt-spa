import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { Wrapper } from './CreateObjectFinalStageModal.styled';
import { CreateObjectFinalStageModalProps } from './CreateObjectFinalStageModal.types';
import { CreateObjectFinalStageForm } from './CreateObjectFinalStageForm/CreateObjectFinalStageForm';

export const CreateObjectFinalStageModal: FC<CreateObjectFinalStageModalProps> = ({
  onPageCancel,
  goBackStage,
  createObjectData
}) => {
  const formId = 'create-object-final-stage-form';
  return (
    <Wrapper>
      <FormModal
        title="Добавление нового объекта"
        visible={true}
        onCancel={() => goBackStage()}
        form={
          <CreateObjectFinalStageForm
            formId={formId}
            createObjectData={createObjectData}
          />
        }
        formId={formId}
        submitBtnText="Создать объект"
      />
    </Wrapper>
  );
};
