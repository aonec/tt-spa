import { createEvent, createStore, sample } from 'effector';
import { connectChannelMutation } from './connectNotificationsService.api';
import { message } from 'antd';
import { notificationsService } from '../notificationsService.models';

const openModal = createEvent();
const closeModal = createEvent();

const $isOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

sample({
  clock: connectChannelMutation.finished.success,
  target: [closeModal, notificationsService.inputs.refreshNotifications],
});

connectChannelMutation.finished.success.watch(() => {
  message.success('Канал подключен!');
});

connectChannelMutation.finished.failure.watch((error) => {
  const { Message, Text } = error.error.response.data.error;

  message.error(Text || Message);
});

export const connectNotificationsService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: { $isOpen },
};
