import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EXTREAM_STEP_NUMBER } from './addPipeNodeCommonDeviceService.constants';
import { addPipeNodeCommonDeviceService } from './addPipeNodeCommonDeviceService.model';
import { AddCommonDeviceForm } from './view/AddCommonDeviceForm';
import { Props } from './addPipeNodeCommonDeviceService.types';

const { inputs, outputs } = addPipeNodeCommonDeviceService;

const formId = 'add-common-device-form';

export const AddPipeNodeCommonDeviceContainer: FC<Props> = ({ resource }) => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const currentFormStep = useStore(outputs.$currentFormStep);

  const close = useEvent(inputs.closeAddCommonDeviceModal);
  const updateRequestPayload = useEvent(
    inputs.updateCommonDeviceRequestPayload
  );

  const submitBtnText =
    currentFormStep === EXTREAM_STEP_NUMBER ? 'Добавить' : 'Далее';

  return (
    <FormModal
      visible={isModalOpen}
      onCancel={() => close()}
      submitBtnText={submitBtnText}
      title="Добавление нового ОДПУ"
      formId={formId}
      form={
        <AddCommonDeviceForm
          updateRequestPayload={updateRequestPayload}
          formId={formId}
          resource={resource}
          currentFormStep={String(currentFormStep)}
        />
      }
    />
  );
};
