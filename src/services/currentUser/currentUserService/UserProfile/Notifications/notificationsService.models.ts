import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  disconnectChannalMutation,
  notifiactionsQuery,
} from './notificationsService.api';
import { message } from 'antd';

const NotificationsGate = createGate();
const refreshNotifications = createEvent();

const openDisconnectModal = createEvent<string>();
const closeDisconnectModal = createEvent();

const $disconnectChannelId = createStore<string | null>(null)
  .on(openDisconnectModal, (_, id) => id)
  .reset(closeDisconnectModal);

const $isDisconnectModalOpen = $disconnectChannelId.map(Boolean);

sample({
  clock: [
    NotificationsGate.open,
    refreshNotifications,
    disconnectChannalMutation.finished.success,
  ],
  target: notifiactionsQuery.start,
});

sample({
  clock: disconnectChannalMutation.finished.success,
  target: closeDisconnectModal,
});

disconnectChannalMutation.finished.success.watch(() => {
  message.warning('Канал удален!');
});

export const notificationsService = {
  inputs: { refreshNotifications, openDisconnectModal, closeDisconnectModal },
  outputs: { $isDisconnectModalOpen, $disconnectChannelId },
  gates: { NotificationsGate },
};
