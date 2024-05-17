import { createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import { notifiactionsQuery } from './notificationsService.api';

const NotificationsGate = createGate();
const refreshNotifications = createEvent();

sample({
  clock: [NotificationsGate.open, refreshNotifications],
  target: notifiactionsQuery.start,
});

export const notificationsService = {
  inputs: {},
  outputs: {},
  gates: { NotificationsGate },
};
