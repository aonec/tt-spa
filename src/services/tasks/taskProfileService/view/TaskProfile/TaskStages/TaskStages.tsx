import React, { FC, useMemo } from 'react';
import { Stage } from './Stage';
import { TitleWrapper, Wrapper } from './TaskStages.styled';
import { TaskStagesProps } from './TaskStages.types';

export const TaskStages: FC<TaskStagesProps> = ({
  stages,
  handleRevertStage,
  isRevertStageLoading,
}) => {
  const stagesView = useMemo(
    () =>
      stages.map((stage, index) => (
        <Stage
          key={stage.id}
          stage={stage}
          isLast={stage.number === stages.length}
          isFirst={index === 0}
          handleRevertStage={handleRevertStage}
          isRevertStageLoading={isRevertStageLoading}
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
