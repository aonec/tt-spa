import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { addPipeNodeCommonDeviceService } from './addPipeNodeCommonDeviceService.model';
import { AddCommonDeviceForm } from './view/AddCommonDeviceForm';

const { inputs, outputs } = addPipeNodeCommonDeviceService;

const formId = 'add-common-device-form';

export const AddPipeNodeCommonDeviceContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const close = useEvent(inputs.closeAddCommonDeviceModal);

  return (
    <FormModal
      visible={isModalOpen}
      onCancel={() => close()}
      title="Добавление нового ОДПУ"
      formId={formId}
      form={<AddCommonDeviceForm formId={formId} />}
    />
  );
};
