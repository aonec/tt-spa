import React, { FC, useState } from 'react';
import { ButtonTT } from '01/tt-components';
import {
  HalfSizeActionsWrapper,
  PushStageButtonWrapper,
  Wrapper,
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

  const { halfSizeActions } = useTaskPanelActions(actions);

  const renderTaskAction = ({ Component }: TaskActionsComponent) => (
    <Component handleChange={setPushStagePayload} />
  );

  return (
    <Wrapper>
      <HalfSizeActionsWrapper>
        {halfSizeActions.map(renderTaskAction)}
      </HalfSizeActionsWrapper>
      <PushStageButtonWrapper>
        <ButtonTT color="blue" onClick={() => console.log(pushStagePayload)}>
          Завершить этап
        </ButtonTT>
      </PushStageButtonWrapper>
    </Wrapper>
  );
};
