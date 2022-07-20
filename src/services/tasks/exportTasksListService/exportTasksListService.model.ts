import {
  downloadTasksList,
  fetchExportTaskFilters,
} from './exportTasksListService.api';
import { message } from 'antd';
import { createDomain, forward } from 'effector';
import {
  ExportTasksListRequestPayload,
  ExportTaskType,
} from './exportTasksListService.types';
import { createGate } from 'effector-react';

const domain = createDomain('exportTasksListService');

const $isModalOpen = domain.createStore(false);
const $exportTaskFilters = domain.createStore<ExportTaskType[]>([]);

const openModal = domain.createEvent();
const closeModal = domain.createEvent();

const getExportTaskFilters = domain.createEffect<void, ExportTaskType[]>(
  fetchExportTaskFilters
);

const exportTasksListFx = domain.createEffect<
  ExportTasksListRequestPayload,
  void
>(downloadTasksList);
const exportTasksList = domain.createEvent<ExportTasksListRequestPayload>();

const $isLoading = exportTasksListFx.pending;

const ExportTaskFiltersGate = createGate();

forward({
  from: ExportTaskFiltersGate.open,
  to: getExportTaskFilters,
});

forward({
  from: exportTasksList,
  to: exportTasksListFx,
});

forward({
  from: exportTasksListFx.done,
  to: closeModal,
});

$isModalOpen.on(openModal, () => true).reset(closeModal);
$exportTaskFilters.on(
  getExportTaskFilters.doneData,
  (_, taskFilters) => taskFilters
);

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
    $exportTaskFilters,
  },
  gates: {
    ExportTaskFiltersGate,
  },
};
