import React, { FC } from 'react';
import {
  HalfSizeActionsWrapper,
  PushStageButtonWrapper,
  Wrapper,
  BottomContentWrapper,
  BottomActionWrapper,
  TaskActionInfoElementWrapper,
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
  taskType,
  handlePushStage,
  isLoading,
  handleChangePushStagePayload,
}) => {
  const {
    halfSizeActions,
    fullSizeActions,
    bottomActions,
  } = useTaskPanelActions(actions);

  const renderTaskAction = ({ Component, type }: TaskActionsComponent) => (
    <Component handleChange={handleChangePushStagePayload} type={type} />
  );

  const actionInfoComponents = taskActionInfoComponents.filter(
    (elem) => elem.taskType === taskType && actions.includes(elem.action)
  );

  return (
    <Wrapper>
      {isLoading && <Skeleton active />}
      {!isLoading && (
        <>
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
        </>
      )}
    </Wrapper>
  );
};
