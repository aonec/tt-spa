import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { exportTasksListService } from './exportTasksListService.models';

export const ExportTasksListContainer = () => {
  const isOpen = useStore(exportTasksListService.outputs.$isModalOpen);

  const handleClose = useEvent(exportTasksListService.inputs.closeModal);

  const formId = 'export-tasks-list-form';

  return (
    <FormModal
      title="Выгрузить списка задач"
      visible={isOpen}
      onCancel={() => handleClose()}
      formId={formId}
      form={<></>}
    />
  );
};
