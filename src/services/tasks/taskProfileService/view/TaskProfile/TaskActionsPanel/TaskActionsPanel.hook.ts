import {
  TaskActionsComponent,
  TaskPanelComponentsGroupsName,
} from './TaskActionsPanel.types';
import { EManagingFirmTaskType, EStageActionType } from 'myApi';
import { useMemo } from 'react';
import {
  actionComponentPositionNamesDictionary,
  taskActionInfoComppnents,
  taskActionsComponents as allTaskActionsComponents,
} from './TaskActionsPanel.constants';

export function useTaskPanelActions(actions: EStageActionType[]) {
  const tasksActionsComponents = useMemo(() => {
    return allTaskActionsComponents.filter(({ actionType }) =>
      actions.includes(actionType)
    );
  }, [actions]);

  const componentsGroups = useMemo(() => {
    return tasksActionsComponents.reduce(
      (acc, action) => {
        const key = actionComponentPositionNamesDictionary[action.position];

        acc[key]?.push(action);

        return acc;
      },
      {
        halfSizeActions: [],
        fullSizeActions: [],
        bottomActions: [],
      } as { [key in TaskPanelComponentsGroupsName]: TaskActionsComponent[] }
    );
  }, [tasksActionsComponents]);

  return componentsGroups;
}

export function useTaskPanelInfoActions(
  taskType: EManagingFirmTaskType,
  actionTypes: EStageActionType[]
) {
  return taskActionInfoComppnents.filter(
    (elem) => elem.taskType === taskType && actionTypes.includes(elem.action)
  );
}
