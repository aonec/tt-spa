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
import { useHistory } from 'react-router-dom';

export const TaskPipeNodeInfo: FC<TaskPipeNodeInfoProps> = ({ pipeNode }) => {
  const { resource, number, id } = pipeNode;

  const history = useHistory();

  return (
    <Wrapper>
      <TitleWrapper>Статистика</TitleWrapper>
      <StatisticWrapper>
        <GroupWrapper>
          <ResourceIconLookup resource={resource} />
          <TextWrapper>Узел {number}</TextWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <GoTo
            onClick={() => history.push(`/nodes/${id}/stats`)}
            data-test="task-pipe-node-link"
          >
            Перейти {'>'}
          </GoTo>
        </GroupWrapper>
      </StatisticWrapper>
    </Wrapper>
  );
};
