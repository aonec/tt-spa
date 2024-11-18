import React, { FC, useCallback } from 'react';
import {
  HalfSizeActionsWrapper,
  PushStageButtonWrapper,
  Wrapper,
  BottomContentWrapper,
  BottomActionWrapper,
  TaskActionInfoElementWrapper,
  Content,
} from './TaskActionsPanel.styled';
import {
  TaskActionsComponent,
  TaskActionsPanelProps,
} from './TaskActionsPanel.types';
import { Skeleton } from 'antd';
import { useTaskPanelActions } from './TaskActionsPanel.hook';
import { Button } from 'ui-kit/Button';
import { taskActionInfoComponents } from './TaskActionsPanel.constants';

export const TaskActionsPanel: FC<TaskActionsPanelProps> = ({
  actions,
  task,
  handlePushStage,
  isLoading,
  handleChangePushStagePayload,
  pushStageRequestPayload,
}) => {
  const { halfSizeActions, fullSizeActions, bottomActions } =
    useTaskPanelActions(actions);

  const renderTaskAction = useCallback(
    ({ Component }: TaskActionsComponent) => (
      <Component
        task={task}
        handleChange={handleChangePushStagePayload}
        pushStageRequestPayload={pushStageRequestPayload}
      />
    ),
    [task, handleChangePushStagePayload, pushStageRequestPayload],
  );

  const actionInfoComponents = taskActionInfoComponents.filter(
    (elem) => elem.taskType === task.type && actions.includes(elem.action),
  );

  return (
    <Wrapper>
      {isLoading && <Skeleton active />}
      <Content visible={!isLoading}>
        {actionInfoComponents.map(({ Component }) => (
          <TaskActionInfoElementWrapper>
            <Component />
          </TaskActionInfoElementWrapper>
        ))}
        <HalfSizeActionsWrapper isOneElement={halfSizeActions.length === 1}>
          {halfSizeActions.map(renderTaskAction)}
        </HalfSizeActionsWrapper>
        {fullSizeActions.map(renderTaskAction)}
        <BottomContentWrapper>
          <BottomActionWrapper>
            {bottomActions.map(renderTaskAction)}
          </BottomActionWrapper>
          <PushStageButtonWrapper>
            <Button onClick={handlePushStage}>Завершить этап</Button>
          </PushStageButtonWrapper>
        </BottomContentWrapper>
      </Content>
    </Wrapper>
  );
};
