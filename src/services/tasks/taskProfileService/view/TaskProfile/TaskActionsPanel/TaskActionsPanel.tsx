import React, { FC, SetStateAction, useState } from 'react';
import { ButtonTT } from '01/tt-components';
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
          <ButtonTT color="blue" onClick={() => console.log(pushStagePayload)}>
            Завершить этап
          </ButtonTT>
        </PushStageButtonWrapper>
      </BottomContentWrapper>
    </Wrapper>
  );
};
