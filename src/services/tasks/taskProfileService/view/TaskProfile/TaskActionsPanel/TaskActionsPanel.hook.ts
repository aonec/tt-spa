import { TaskActionsComponent } from './TaskActionsPanel.types';
import { EStageActionType } from 'myApi';
import { useMemo } from 'react';
import { taskActionsComponents } from './TaskActionsPanel.constants';

export function useTaskPanelActions(actions: EStageActionType[]) {
  const tasksActionsComponents = useMemo(() => {
    return taskActionsComponents.filter(({ actionType }) =>
      actions.includes(actionType)
    );
  }, [actions]);

  const { halfSizeActions, fullSizeActions } = useMemo(() => {
    return taskActionsComponents.reduce(
      (acc, action) => {
        const key =
          action.size === 'full' ? 'fullSizeActions' : 'halfSizeActions';

        acc[key] = [...acc[key], action];

        return acc;
      },
      {
        halfSizeActions: [] as TaskActionsComponent[],
        fullSizeActions: [] as TaskActionsComponent[],
      }
    );
  }, [tasksActionsComponents]);

  return { halfSizeActions, fullSizeActions };
}
