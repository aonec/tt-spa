import React, { FC, useMemo } from 'react';
import { Stage } from './Stage';
import { TitleWrapper, Wrapper } from './TaskStages.styled';
import { TaskStagesProps } from './TaskStages.types';
import { EStageStatus } from "../../../../../../myApi";

export const TaskStages: FC<TaskStagesProps> = ({
  stages,
  handleRevertStage,
  isRevertStageLoading,
}) => {
  const stagesView = useMemo(
    () =>
      stages.map((stage, index) => {
        const canRevertStage = stages[stage.number]?.status === EStageStatus.InProgress

        return (
          <Stage
            key={stage.id}
            stage={stage}
            isLast={stage.number === stages.length}
            canRevertStage={canRevertStage}
            handleRevertStage={handleRevertStage}
            isRevertStageLoading={isRevertStageLoading}
          />
        );
      }),
    [stages]
  );

  return (
    <Wrapper>
      <TitleWrapper>Этапы выполнения</TitleWrapper>
      {stagesView}
    </Wrapper>
  );
};
