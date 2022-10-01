import { ActionComponentProps } from '../TaskActionsPanel.types';

export type CloseDevicesPayload = {
  deviceCloses: { deviceId: number; closingDate: string }[];
};

export type CloseDevicesContainerProps = ActionComponentProps;
