import { downloadTasksList } from './exportTasksListService.api';
import { message } from 'antd';
import { createDomain, forward } from 'effector';
import { ExportTasksListRequestPayload } from './exportTasksListService.types';

const exportTasksListServiceDomain = createDomain('exportTasksListService');

const $isModalOpen = exportTasksListServiceDomain.createStore(false);

const openModal = exportTasksListServiceDomain.createEvent();
const closeModal = exportTasksListServiceDomain.createEvent();

const exportTasksListFx = exportTasksListServiceDomain.createEffect<
  ExportTasksListRequestPayload,
  void
>(downloadTasksList);

const exportTasksList = exportTasksListServiceDomain.createEvent<ExportTasksListRequestPayload>();

const exportTasksListDone = exportTasksListFx.done;
const exportTasksListFail = exportTasksListFx.fail;

const $isLoading = exportTasksListFx.pending;

forward({
  from: exportTasksList,
  to: exportTasksListFx,
});

forward({
  from: exportTasksListDone,
  to: closeModal,
});

$isModalOpen.on(openModal, () => true).reset(closeModal);

exportTasksListDone.watch(() =>
  message.success('Список задач успешно выгружен!')
);

exportTasksListFail.watch(() => {
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
