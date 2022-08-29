import React, { FC } from 'react';
import { ButtonTT } from '01/tt-components';
import { PushStageButtonWrapper, Wrapper } from './TaskActionsPanel.styled';
import { TaskActionsPanelProps } from './TaskActionsPanel.types';

export const TaskActionsPanel: FC<TaskActionsPanelProps> = ({ actions }) => {
  return (
    <Wrapper>
      {actions.join(' ')}
      <PushStageButtonWrapper>
        <ButtonTT color="blue">Завершить этап</ButtonTT>
      </PushStageButtonWrapper>
    </Wrapper>
  );
};
