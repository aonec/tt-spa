import React, { FC } from 'react';
import { completionLabelsDictionary } from 'services/tasks/taskProfileService/taskProfileService.constants';
import {
  PanelInfoLable,
  PanelInfoText,
  PanelInfoWrapper,
  Title,
  Wrapper,
} from './TaskConfirmationPanel.styled';
import { TaskConfirmationPanelProps } from './TaskConfirmationPanel.types';

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
