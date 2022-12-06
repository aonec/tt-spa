import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EXTREAM_STEP_NUMBER } from './addPipeNodeCommonDeviceService.constants';
import { addPipeNodeCommonDeviceService } from './addPipeNodeCommonDeviceService.model';
import { AddCommonDeviceForm } from './view/AddCommonDeviceForm';
import { Props } from './addPipeNodeCommonDeviceService.types';
import { AddCommunicationPipeModal } from './view/AddCommunicationPipeModal';

const { inputs, outputs } = addPipeNodeCommonDeviceService;

const formId = 'add-common-device-form';

export const AddPipeNodeCommonDeviceContainer: FC<Props> = ({
  resource,
  communicationPipes,
  handleAddCommunicationPipe,
}) => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const currentFormStep = useStore(outputs.$currentFormStep);
  const requestPayload = useStore(outputs.$requestPayload);
  const isAddPipeModalOpen = useStore(outputs.$isAddPipeModalOpen);

  const close = useEvent(inputs.closeAddCommonDeviceModal);
  const updateRequestPayload = useEvent(
    inputs.updateCommonDeviceRequestPayload
  );
  const goPrevStep = useEvent(inputs.goPrevStep);
  const openAddPipeModal = useEvent(inputs.openAddPipeModal);
  const closeAddPipeModal = useEvent(inputs.closeAddPipeModal);

  const submitBtnText =
    currentFormStep === EXTREAM_STEP_NUMBER ? 'Добавить' : 'Далее';

  const cancelBtnText = currentFormStep === 0 ? 'Отмена' : 'Назад';

  const onCancel = currentFormStep === 0 ? close : goPrevStep;

  return (
    <>
      <FormModal
        visible={isModalOpen}
        onCancel={() => onCancel()}
        cancelBtnText={cancelBtnText}
        submitBtnText={submitBtnText}
        title="Добавление нового ОДПУ"
        formId={formId}
        form={
          <>
            <AddCommunicationPipeModal
              isOpen={isAddPipeModalOpen}
              closeAddPipeModal={() => closeAddPipeModal()}
              handleAddCommunicationPipe={handleAddCommunicationPipe}
            />
            <AddCommonDeviceForm
              updateRequestPayload={updateRequestPayload}
              formId={formId}
              resource={resource}
              currentFormStep={currentFormStep}
              requestPayload={requestPayload}
              openAddPipeModal={() => openAddPipeModal()}
              communicationPipes={communicationPipes}
            />
          </>
        }
      />
    </>
  );
};
