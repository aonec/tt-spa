import { createEvent, createStore, sample } from 'effector';
import { tasksExportQuery } from './exportTasksListService.api';
import { message } from 'antd';
// import { message } from 'antd';

const openModal = createEvent();
const closeModal = createEvent();

const $isOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({
  clock: tasksExportQuery.finished.success,
  target: closeModal,
});

tasksExportQuery.finished.failure.watch(async ({ error }) => {
  const json = await (
    error.response.data as unknown as {
      text: () => Promise<string>;
    }
  ).text();

  const data = JSON.parse(json);

  message.error(data.error.Text || data.error.Message);
});

export const exportTasksListService = {
  inputs: { openModal, closeModal },
  outputs: { $isOpen },
};
