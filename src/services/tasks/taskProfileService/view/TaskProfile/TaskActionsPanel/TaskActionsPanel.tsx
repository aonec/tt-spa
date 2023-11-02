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
  additionActions,
  task,
  handlePushStage,
  isLoading,
  handleChangePushStagePayload,
  pushStageRequestPayload,
}) => {
  const { halfSizeActions, fullSizeActions, bottomActions } =
    useTaskPanelActions(actions);

  const panelAdditionalActions = useTaskPanelActions(additionActions);
  const halfSizeAdditionalActions = panelAdditionalActions.halfSizeActions;
  const fullSizeAdditionalActions = panelAdditionalActions.fullSizeActions;
  const bottomAdditionalActions = panelAdditionalActions.bottomActions;

  const renderTaskAction = ({ Component }: TaskActionsComponent) => (
    <Component
      task={task}
      handleChange={handleChangePushStagePayload}
      pushStageRequestPayload={pushStageRequestPayload}
    />
  );

  const actionInfoComponents = taskActionInfoComponents.filter(
    (elem) => elem.taskType === task.type && actions.includes(elem.action),
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
          </BottomContentWrapper>

          <HalfSizeActionsWrapper
            isOneElement={halfSizeAdditionalActions.length === 1}
          >
            {halfSizeAdditionalActions.map(renderTaskAction)}
          </HalfSizeActionsWrapper>
          {fullSizeAdditionalActions.map(renderTaskAction)}
          <BottomActionWrapper>
            {bottomAdditionalActions.map(renderTaskAction)}
          </BottomActionWrapper>

          <PushStageButtonWrapper>
            <Button onClick={handlePushStage}>Завершить этап</Button>
          </PushStageButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};
