import { EStageActionType } from 'myApi';
import { useMemo } from 'react';
import { taskActionsComponents } from './TaskActionsPanel.constants';

export function useTaskPanelActions(actions: EStageActionType[]) {
  const tasksActionsComponents = useMemo(() => {
    return taskActionsComponents.filter(({ actionType }) =>
      actions.includes(actionType)
    );
  }, [actions]);

  const halfSizeActions = useMemo(() => {
    return taskActionsComponents.filter(({ size }) => size === 'half');
  }, [tasksActionsComponents]);

  return { halfSizeActions };
}
