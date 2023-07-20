import React, { FC, useMemo } from 'react';
import { Stage } from './Stage';
import { TitleWrapper, Wrapper } from './TaskStages.styled';
import { TaskStagesProps } from './TaskStages.types';
import { EStageStatus } from 'api/myApi';

export const TaskStages: FC<TaskStagesProps> = ({
  stages,
  handleRevertStage,
  isRevertStageLoading,
  isStageCanBeReverted,
}) => {
  const stagesView = useMemo(
    () =>
      stages.map((stage, index) => {
        const canRevertStage =
          stages[stage.number]?.status === EStageStatus.InProgress &&
          isStageCanBeReverted;

        return (
          <Stage
            key={stage.id}
            stage={stage}
            isLast={stage.number === stages.length}
            handleRevertStage={handleRevertStage}
            isRevertStageLoading={isRevertStageLoading}
            isShowRevertStageButton={canRevertStage}
          />
        );
      }),
    [stages, handleRevertStage, isRevertStageLoading, isStageCanBeReverted],
  );

  return (
    <Wrapper>
      <TitleWrapper>Этапы выполнения</TitleWrapper>
      {stagesView}
    </Wrapper>
  );
};
