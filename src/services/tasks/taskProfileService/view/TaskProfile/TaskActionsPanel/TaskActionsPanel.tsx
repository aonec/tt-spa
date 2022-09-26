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
import {
  useTaskPanelActions,
  useTaskPanelInfoActions,
} from './TaskActionsPanel.hook';
import { Button } from 'ui-kit/Button';
import { Skeleton } from 'antd';

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

  const actionInfoComponents = useTaskPanelInfoActions(taskType);

  return (
    <Wrapper>
      {isLoading ? (
        <Skeleton active />
      ) : (
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
