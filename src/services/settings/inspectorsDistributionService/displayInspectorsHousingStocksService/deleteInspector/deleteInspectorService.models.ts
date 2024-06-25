import { combine, createEvent, createStore, sample } from 'effector';
import { deleteInspectorMutation } from './deleteInspectorService.api';
import { message } from 'antd';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService';

const handleDelete = createEvent<number>();
const cancelDelete = createEvent();

const handleConfirmDelete = createEvent();

const $inspectorId = createStore<number | null>(null)
  .on(handleDelete, (_, id) => id)
  .reset(cancelDelete, deleteInspectorMutation.finished.success);

const $isModalOpen = $inspectorId.map(Boolean);

const $deletingInspector = combine(
  $inspectorId,
  displayInspectorsService.outputs.$inspectorsList,
  (id, inspectors) =>
    inspectors?.find((inspector) => inspector.id === id) || null,
);

sample({
  clock: handleConfirmDelete,
  source: $inspectorId,
  filter: Boolean,
  target: deleteInspectorMutation.start,
});

deleteInspectorMutation.finished.success.watch(() =>
  message.success('Инспктор удален!'),
);

sample({
  clock: deleteInspectorMutation.finished.success,
  target: displayInspectorsService.inputs.refetchInspectors,
});

deleteInspectorMutation.finished.failure.watch((e) => {
  const error = e.error.response.data.error;

  message.error(error.Text || error.Message);
});

const $isLoading = deleteInspectorMutation.$pending;

export const deleteInspectorService = {
  inputs: { handleConfirmDelete, handleDelete, cancelDelete, $isLoading },
  outputs: { $isModalOpen, $deletingInspector },
};
