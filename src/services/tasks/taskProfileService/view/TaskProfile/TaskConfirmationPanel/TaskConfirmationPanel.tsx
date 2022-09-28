import React, { FC } from 'react';
import {
  PanelInfoLable,
  PanelInfoText,
  PanelInfoWrapper,
  Title,
  Wrapper,
} from './TaskConfirmationPanel.styled';
import { TaskConfirmationPanelProps } from './TaskConfirmationPanel.types';
import { completionLabelsDictionary } from '../TaskActionsPanel/completionStageService/view/CompletionSelect/CompletionSelect.constants';

export const TaskConfirmationPanel: FC<TaskConfirmationPanelProps> = ({
  taskConfirmation,
  taskType,
}) => {
  const { comment, description } = taskConfirmation;

  const completionLable = completionLabelsDictionary[taskType];

  return (
    <>
      <Title>Заключение</Title>
      <Wrapper>
        <PanelInfoWrapper>
          <PanelInfoLable>{completionLable}</PanelInfoLable>
          <PanelInfoText>{description}</PanelInfoText>
        </PanelInfoWrapper>

        <PanelInfoWrapper>
          <PanelInfoLable>Комментарий</PanelInfoLable>
          <PanelInfoText>{comment}</PanelInfoText>
        </PanelInfoWrapper>
      </Wrapper>
    </>
  );
};
