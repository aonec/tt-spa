import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { FormModal } from '../../../ui-kit/Modals/FormModal/FormModal';
import { exportTasksListService } from './exportTasksListService.model';
import { ExportTasksListForm } from './view/ExportTasksListForm';

export const ExportTasksListModalContainer = () => {
  const { inputs, outputs } = exportTasksListService;

  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);
  const taskFilters = useStore(outputs.$exportTaskFilters)

  const handleClose = useEvent(inputs.closeModal);

  const handleSubmit = useEvent(inputs.exportTasksList);

  const formId = 'export-tasks-list-form';

  const form = useMemo(
    () => <ExportTasksListForm formId={formId} handleSubmit={handleSubmit} taskFilters={taskFilters}/>,
    [formId, handleSubmit, taskFilters]
  );

  return (
    <FormModal
      loading={isLoading}
      title="Выгрузить списка задач"
      visible={isOpen}
      onCancel={() => handleClose()}
      formId={formId}
      form={form}
    />
  );
};
