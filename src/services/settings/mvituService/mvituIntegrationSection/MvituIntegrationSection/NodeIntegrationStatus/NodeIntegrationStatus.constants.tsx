import { NodeStatusType } from 'api/mvitu.types';
import { ReactNode } from 'react';
import { PauseIcon, RegisteredIcon } from 'ui-kit/icons';

export const NodeIntegrationStatusNamesLookup: {
  [key in keyof typeof NodeStatusType]: string;
} = {
  [NodeStatusType.Active]: 'Активно',
  [NodeStatusType.Paused]: 'Не активна',
};

export const NodeIntegrationStatusIconsLookup: {
  [key in keyof typeof NodeStatusType]: ReactNode;
} = {
  [NodeStatusType.Active]: <RegisteredIcon />,
  [NodeStatusType.Paused]: <PauseIcon />,
};
