import React, { FC, SetStateAction, useCallback, useState } from 'react';
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
import { StagePushRequest } from 'myApi';
import { Button } from 'ui-kit/Button';

export const TaskActionsPanel: FC<TaskActionsPanelProps> = ({
  actions,
  taskType,
}) => {
  const [pushStagePayload, setPushStagePayload] = useState<StagePushRequest>(
    {}
  );

  const handleStagePayloadChanged = useCallback(
    (dispatch: SetStateAction<StagePushRequest>) => {
      if (typeof dispatch === 'function')
        return void setPushStagePayload(dispatch);

      setPushStagePayload((prev) => ({ ...prev, ...dispatch }));
    },
    [setPushStagePayload]
  );

  const {
    halfSizeActions,
    fullSizeActions,
    bottomActions,
  } = useTaskPanelActions(actions);

  const renderTaskAction = ({ Component, type }: TaskActionsComponent) => (
    <Component handleChange={handleStagePayloadChanged} type={type} />
  );

  const actionInfoComponents = useTaskPanelInfoActions(taskType);

  return (
    <Wrapper>
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
          <Button onClick={() => console.log(pushStagePayload)}>
            Завершить этап
          </Button>
        </PushStageButtonWrapper>
      </BottomContentWrapper>
    </Wrapper>
  );
};
