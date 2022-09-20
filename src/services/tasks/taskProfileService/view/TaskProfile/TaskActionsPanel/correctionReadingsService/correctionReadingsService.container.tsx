import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { correctionReadingsService } from './correctionReadingsService.model';
import { CorrectionReadings } from './view/CorrectionReadings';

const { outputs } = correctionReadingsService;

export const CorrectionReadingsContainer: FC<ActionComponentProps> = () => {
  const task = useStore(outputs.$task);

  if (!task) return null;

  return <CorrectionReadings task={task} />;
};
