import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EXTREAM_STEP_NUMBER } from './addPipeNodeCommonDeviceService.constants';
import { addPipeNodeCommonDeviceService } from './addPipeNodeCommonDeviceService.model';
import { AddCommonDeviceForm } from './view/AddCommonDeviceForm';
import { Props } from './addPipeNodeCommonDeviceService.types';

const { inputs, outputs } = addPipeNodeCommonDeviceService;

const formId = 'add-common-device-form';

export const AddPipeNodeCommonDeviceContainer: FC<Props> = ({
  configuration,
  communicationPipes,
  handleAddCommunicationPipe,
}) => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const currentFormStep = useStore(outputs.$currentFormStep);
  const requestPayload = useStore(outputs.$requestPayload);

  const close = useEvent(inputs.closeAddCommonDeviceModal);
  const updateRequestPayload = useEvent(
    inputs.updateCommonDeviceRequestPayload,
  );
  const goPrevStep = useEvent(inputs.goPrevStep);
  const handleFormComplete = useEvent(inputs.handleFormComplete);

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
            <AddCommonDeviceForm
              updateRequestPayload={updateRequestPayload}
              formId={formId}
              configuration={configuration}
              currentFormStep={currentFormStep}
              requestPayload={requestPayload}
              communicationPipes={communicationPipes}
              handleFormComplete={() => handleFormComplete()}
            />
          </>
        }
      />
    </>
  );
};
