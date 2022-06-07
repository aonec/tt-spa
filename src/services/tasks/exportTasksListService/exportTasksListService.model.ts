import { downloadTasksList } from './exportTasksListService.api';
import { message } from 'antd';
import { createDomain, forward } from 'effector';
import { ExportTasksListRequestPayload } from './exportTasksListService.types';

const domain = createDomain('exportTasksListService');

const $isModalOpen = domain.createStore(false);

const openModal = domain.createEvent();
const closeModal = domain.createEvent();

const exportTasksListFx = domain.createEffect<
  ExportTasksListRequestPayload,
  void
>(downloadTasksList);

const exportTasksList = domain.createEvent<ExportTasksListRequestPayload>();

const $isLoading = exportTasksListFx.pending;

forward({
  from: exportTasksList,
  to: exportTasksListFx,
});

forward({
  from: exportTasksListFx.done,
  to: closeModal,
});

$isModalOpen.on(openModal, () => true).reset(closeModal);

exportTasksListFx.done.watch(() =>
  message.success('Список задач успешно выгружен!')
);

exportTasksListFx.fail.watch(() => {
  message.error('Ошибка выгрузки списка задач');
});

export const exportTasksListService = {
  inputs: {
    openModal,
    closeModal,
    exportTasksList,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
  },
};
