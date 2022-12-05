import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { createNodeServiceZoneService } from './createNodeServiceZoneService.model';
import { CreateNodeServiceZoneForm } from './view/CreateNodeServiceZoneForm';

const { inputs, outputs } = createNodeServiceZoneService;

const formId = 'create-service-zone-form';

export const CreateNodeServiceZoneContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);

  const handleSubmit = useEvent(inputs.handleCreateNodeServiceZone);
  const handleClose = useEvent(inputs.closeCreateNodeServiceZoneModal);

  return (
    <FormModal
      onCancel={() => handleClose()}
      title="Новая зона обслуживания"
      visible={isModalOpen}
      loading={isLoading}
      formId={formId}
      form={
        <CreateNodeServiceZoneForm
          handleSubmit={handleSubmit}
          formId={formId}
        />
      }
    />
  );
};
