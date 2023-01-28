import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { CheckNodeModal } from './CheckNodeModal';
import { checkNodeService } from './models';
import { useForm } from 'effector-forms/dist';

export const CheckNodeModalContainer = () => {
  const visible = useStore(checkNodeService.outputs.$isCheckNodeModalOpen);
  const isEditOpen = useStore(
    checkNodeService.outputs.$isEditNodeCheckModalOpen
  );
  const editPayload = useStore(
    checkNodeService.outputs.$editNodeCheckModalPayload
  );
  const loading = useStore(checkNodeService.outputs.$loading);

  const closeModal = useEvent(checkNodeService.inputs.closeCheckNodeModal);
  const clearPayloadFile = useEvent(checkNodeService.inputs.clearPayloadFile);

  const { fields, submit } = useForm(checkNodeService.forms.checkNodeForm);

  return (
    <CheckNodeModal
      closeCheckApartmentModal={() => closeModal()}
      submit={submit}
      pending={loading}
      fields={fields}
      visible={visible}
      isEditOpen={isEditOpen}
      payload={editPayload}
      clearPayloadFile={() => clearPayloadFile()}
    />
  );
};
