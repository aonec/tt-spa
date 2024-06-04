import React from 'react';
import { notificationsService } from './notificationsService.models';
import { NotificationsPage } from './NotificationsPage';
import { useUnit } from 'effector-react';
import {
  disconnectChannelMutation,
  notifiactionsQuery,
} from './notificationsService.api';
import { connectNotificationsService } from './connectNotifications/connectNotificationsService.models';
import { ConnectNotificationsContainer } from './connectNotifications';
import { DisconnectNotificationsModal } from './DisconnectNotificationsModal';

const {
  inputs,
  outputs,
  gates: { NotificationsGate },
} = notificationsService;

export const NotificationsContainer = () => {
  const {
    channels,
    isLoading,
    handleConnect,
    handleDisconnect,
    closeDisconnectModal,
    isDisconnectModalOpen,
    disconnectChannel,
    disconnectChennalId,
    isDisconnectLoading,
  } = useUnit({
    channels: notifiactionsQuery.$data,
    isLoading: notifiactionsQuery.$pending,
    handleConnect: connectNotificationsService.inputs.openModal,
    handleDisconnect: inputs.openDisconnectModal,
    closeDisconnectModal: inputs.closeDisconnectModal,
    isDisconnectModalOpen: outputs.$isDisconnectModalOpen,
    disconnectChennalId: outputs.$disconnectChannelId,
    disconnectChannel: disconnectChannelMutation.start,
    isDisconnectLoading: disconnectChannelMutation.$pending,
  });

  return (
    <>
      <NotificationsGate />
      <ConnectNotificationsContainer />
      <DisconnectNotificationsModal
        isOpen={isDisconnectModalOpen}
        isLoading={isDisconnectLoading}
        handleClose={closeDisconnectModal}
        handleDisconnect={() =>
          disconnectChennalId && disconnectChannel(disconnectChennalId)
        }
      />
      <NotificationsPage
        channels={channels || []}
        isLoading={isLoading}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
    </>
  );
};
