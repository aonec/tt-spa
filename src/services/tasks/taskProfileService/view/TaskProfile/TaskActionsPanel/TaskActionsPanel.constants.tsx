import React from "react"
import { EStageActionType } from 'myApi';
import { TaskActionsComponent } from './TaskActionsPanel.types';

export const taskActionsComponents: TaskActionsComponent[] = [
  {
    actionType: EStageActionType.AddPerpetrator,
    component: () => <></>,
  },
];
