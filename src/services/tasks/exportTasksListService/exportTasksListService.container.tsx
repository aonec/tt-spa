import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { exportTasksListService } from './exportTasksListService.models';
import { ExportTasksListForm } from './view/ExportTasksListForm';

export const ExportTasksListModalContainer = () => {
  const isOpen = useStore(exportTasksListService.outputs.$isModalOpen);
  const isLoading = useStore(exportTasksListService.outputs.$isLoading);

  const handleClose = useEvent(exportTasksListService.inputs.closeModal);

  const handleSubmit = useEvent(exportTasksListService.inputs.exportTasksList);

  const formId = 'export-tasks-list-form';

  return (
    <FormModal
      loading={isLoading}
      title="Выгрузить списка задач"
      visible={isOpen}
      onCancel={() => handleClose()}
      formId={formId}
      form={<ExportTasksListForm formId={formId} handleSubmit={handleSubmit} />}
    />
  );
};
