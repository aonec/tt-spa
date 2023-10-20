import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import {
  GroupWrapper,
  LinkSC,
  StatisticWrapper,
  TextWrapper,
  TitleWrapper,
  Wrapper,
} from './TaskPipeNodeInfo.styled';
import { TaskPipeNodeInfoProps } from './TaskPipeNodeInfo.types';

export const TaskPipeNodeInfo: FC<TaskPipeNodeInfoProps> = ({ pipeNode }) => {
  const { resource, number, id } = pipeNode;

  return (
    <Wrapper>
      <TitleWrapper>Статистика</TitleWrapper>
      <StatisticWrapper>
        <GroupWrapper>
          <ResourceIconLookup resource={resource} />
          <TextWrapper>Узел {number}</TextWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <LinkSC
            to={`/nodes/${id}/stats`}
            target="_blank"
            data-test="task-pipe-node-link"
          >
            Перейти {'>'}
          </LinkSC>
        </GroupWrapper>
      </StatisticWrapper>
    </Wrapper>
  );
};
