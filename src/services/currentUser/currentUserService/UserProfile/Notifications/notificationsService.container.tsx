import React from 'react';
import { notificationsService } from './notificationsService.models';
import { NotificationsPage } from './NotificationsPage';
import { useUnit } from 'effector-react';
import {
  disconnectChannalMutation,
  notifiactionsQuery,
} from './notificationsService.api';
import { connectNotificationsService } from './connectNotifications/connectNotificationsService.models';
import { ConnectNotificationsContainer } from './connectNotifications';

const {
  gates: { NotificationsGate },
} = notificationsService;

export const NotificationsContainer = () => {
  const { channels, isLoading, handleConnect, handleDisconnect } = useUnit({
    channels: notifiactionsQuery.$data,
    isLoading: notifiactionsQuery.$pending,
    handleConnect: connectNotificationsService.inputs.openModal,
    handleDisconnect: disconnectChannalMutation.start,
  });

  return (
    <>
      <NotificationsGate />
      <ConnectNotificationsContainer />
      <NotificationsPage
        channels={channels || []}
        isLoading={isLoading}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
    </>
  );
};
