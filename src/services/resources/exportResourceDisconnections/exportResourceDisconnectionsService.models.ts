import { createEffect, createEvent, sample } from 'effector';
import { ExportResourceDisconnectingParams } from './exportResourceDisconnectionsService.types';
import { exportResourceDisconnectionsQuery } from './exportResourceDisconnectionsService.api';
import { saveAs } from 'file-saver';
import { message } from 'antd';
import dayjs from 'dayjs';

const saveFileFx = createEffect<File, void>((file) => {
  saveAs(
    file,
    `выгрузка_график_отключений_${dayjs().format('DD.MM.YYYY')}.xlsx`,
  );
});

const handleExportResourceDisconnections =
  createEvent<ExportResourceDisconnectingParams>();

sample({
  clock: handleExportResourceDisconnections,
  target: exportResourceDisconnectionsQuery.start,
});

sample({
  clock: exportResourceDisconnectionsQuery.finished.success,
  fn: ({ result }) => result,
  target: saveFileFx,
});

exportResourceDisconnectionsQuery.start.watch(() => {
  message.loading('Загрузка начата...');
});

const $isLoading = exportResourceDisconnectionsQuery.$pending;

export const exportResourceDisconnectionsService = {
  inputs: { handleExportResourceDisconnections },
  outputs: { $isLoading },
};
