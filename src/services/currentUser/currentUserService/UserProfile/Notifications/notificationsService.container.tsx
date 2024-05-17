import React from 'react';
import { notificationsService } from './notificationsService.models';
import { NotificationsPage } from './NotificationsPage';
import { useUnit } from 'effector-react';
import { notifiactionsQuery } from './notificationsService.api';
import { connectNotificationsService } from './connectNotifications/connectNotificationsService.models';
import { ConnectNotificationsContainer } from './connectNotifications';

const {
  gates: { NotificationsGate },
} = notificationsService;

export const NotificationsContainer = () => {
  const { channels, isLoading, handleConnect } = useUnit({
    channels: notifiactionsQuery.$data,
    isLoading: notifiactionsQuery.$pending,
    handleConnect: connectNotificationsService.inputs.openModal,
  });

  return (
    <>
      <NotificationsGate />
      <ConnectNotificationsContainer />
      <NotificationsPage
        channels={channels || []}
        isLoading={isLoading}
        handleConnect={handleConnect}
      />
    </>
  );
};
