import React, { FC } from 'react';
import {
  Count,
  Panel,
  SkeletonSC,
  Title,
  Wrapper,
} from './TasksSummary.styled';
import { Props } from './TasksSummary.types';

export const TasksSummary: FC<Props> = ({ tasksSummaryData, isLoading }) => {
  return (
    <Wrapper>
      <Panel>
        <Title> Активно:</Title>
        {isLoading ? (
          <SkeletonSC active />
        ) : (
          <Count>{tasksSummaryData.executingTasksCount || 0} задач</Count>
        )}
      </Panel>
      <Panel>
        <Title> Истекает:</Title>
        {isLoading ? (
          <SkeletonSC active />
        ) : (
          <Count>{tasksSummaryData.runningOutTasksCount || 0} задач</Count>
        )}
      </Panel>
      <Panel>
        <Title> Просрочено: </Title>
        {isLoading ? (
          <SkeletonSC active />
        ) : (
          <Count>{tasksSummaryData.expiredTasksCount || 0} задач</Count>
        )}
      </Panel>
    </Wrapper>
  );
};
