import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import {
  GroupWrapper,
  GoTo,
  StatisticWrapper,
  TextWrapper,
  TitleWrapper,
  Wrapper,
} from './TaskPipeNodeInfo.styled';
import { TaskPipeNodeInfoProps } from './TaskPipeNodeInfo.types';
import { useNavigate } from 'react-router-dom';

export const TaskPipeNodeInfo: FC<TaskPipeNodeInfoProps> = ({ pipeNode }) => {
  const { resource, title, id } = pipeNode;

  const navigate = useNavigate();

  return (
    <Wrapper>
      <TitleWrapper>Статистика</TitleWrapper>
      <StatisticWrapper>
        <GroupWrapper>
          <ResourceIconLookup resource={resource} />
          <TextWrapper>Узел {title}</TextWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <GoTo
            onClick={() => navigate(`/nodes/${id}/stats`)}
            data-test="task-pipe-node-link"
          >
            Перейти {'>'}
          </GoTo>
        </GroupWrapper>
      </StatisticWrapper>
    </Wrapper>
  );
};
