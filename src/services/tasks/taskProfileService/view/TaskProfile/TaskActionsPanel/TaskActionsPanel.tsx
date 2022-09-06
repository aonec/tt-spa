import React, { FC, useMemo } from 'react';
import { ButtonTT } from '01/tt-components';
import { PushStageButtonWrapper, Wrapper } from './TaskActionsPanel.styled';
import { TaskActionsPanelProps } from './TaskActionsPanel.types';
import { taskActionsComponents } from './TaskActionsPanel.constants';

export const TaskActionsPanel: FC<TaskActionsPanelProps> = ({ actions }) => {
  const filteredTasksActionsComponents = useMemo(() => {
    return taskActionsComponents.filter(({ actionType }) =>
      actions.includes(actionType)
    );
  }, [actions]);

  return (
    <Wrapper>
      {filteredTasksActionsComponents.map(({ Component }) => (
        <Component />
      ))}
      <PushStageButtonWrapper>
        <ButtonTT color="blue">Завершить этап</ButtonTT>
      </PushStageButtonWrapper>
    </Wrapper>
  );
};
