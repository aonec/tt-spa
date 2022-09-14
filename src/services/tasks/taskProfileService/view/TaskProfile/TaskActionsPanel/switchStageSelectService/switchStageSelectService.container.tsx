import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { SwitchStageSelect } from './view/SwitchStageSelect';

export const SwitchStageSelectContainer: FC<ActionComponentProps> = ({}) => {
  return <SwitchStageSelect />;
};
