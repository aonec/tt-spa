import { createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  disconnectChannalMutation,
  notifiactionsQuery,
} from './notificationsService.api';
import { message } from 'antd';

const NotificationsGate = createGate();
const refreshNotifications = createEvent();

sample({
  clock: [
    NotificationsGate.open,
    refreshNotifications,
    disconnectChannalMutation.finished.success,
  ],
  target: notifiactionsQuery.start,
});

disconnectChannalMutation.finished.success.watch(() => {
  message.warning('Канал удален!');
});

export const notificationsService = {
  inputs: {},
  outputs: {},
  gates: { NotificationsGate },
};
