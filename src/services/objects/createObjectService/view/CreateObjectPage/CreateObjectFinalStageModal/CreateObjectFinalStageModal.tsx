import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { Wrapper } from './CreateObjectFinalStageModal.styled';
import { CreateObjectFinalStageModalProps } from './CreateObjectFinalStageModal.types';
import { CreateObjectFinalStageForm } from './CreateObjectFinalStageForm/CreateObjectFinalStageForm';

export const CreateObjectFinalStageModal: FC<CreateObjectFinalStageModalProps> = ({
  handleSubmit,
  onPageCancel,
  goBackStage,
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
            handleSubmit={handleSubmit}
          />
        }
        formId={formId}
        submitBtnText="Создать объект"
      />
    </Wrapper>
  );
};
