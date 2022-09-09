import React, { FC, SetStateAction, useState } from 'react';
import {
  HalfSizeActionsWrapper,
  PushStageButtonWrapper,
  Wrapper,
  BottomContentWrapper,
  BottomActionWrapper,
} from './TaskActionsPanel.styled';
import {
  TaskActionsComponent,
  TaskActionsPanelProps,
} from './TaskActionsPanel.types';
import { useTaskPanelActions } from './TaskActionsPanel.hook';
import { StagePushRequest } from 'myApi';
import { Button } from 'ui-kit/Button';

export const TaskActionsPanel: FC<TaskActionsPanelProps> = ({ actions }) => {
  const [pushStagePayload, setPushStagePayload] = useState<StagePushRequest>(
    {}
  );

  const handleStagePayloadChanged = (
    dispatch: SetStateAction<StagePushRequest>
  ) => {
    if (typeof dispatch === 'function')
      return void setPushStagePayload(dispatch);

    setPushStagePayload((prev) => ({ ...prev, ...dispatch }));
  };

  const {
    halfSizeActions,
    fullSizeActions,
    bottomActions,
  } = useTaskPanelActions(actions);

  const renderTaskAction = ({ Component, type }: TaskActionsComponent) => (
    <Component handleChange={handleStagePayloadChanged} type={type} />
  );

  return (
    <Wrapper>
      <HalfSizeActionsWrapper>
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
