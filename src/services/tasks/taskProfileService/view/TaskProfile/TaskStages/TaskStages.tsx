import React, { FC, useMemo } from 'react';
import { Stage } from './Stage';
import { TitleWrapper, Wrapper } from './TaskStages.styled';
import { TaskStagesProps } from './TaskStages.types';

export const TaskStages: FC<TaskStagesProps> = ({ stages }) => {
  const stagesView = useMemo(
    () =>
      stages.map((stage) => (
        <Stage
          key={stage.id}
          stage={stage}
          isLast={stage.number === stages.length}
        />
      )),
    [stages]
  );

  return (
    <Wrapper>
      <TitleWrapper>Этапы выполнения</TitleWrapper>
      {stagesView}
    </Wrapper>
  );
};
