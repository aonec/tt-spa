import { EStageStatus, EStageType } from 'api/types';
import React, { FC, useMemo } from 'react';
import { Button } from 'ui-kit/Button';
import { ChoiceIcon, FinishIcon, OkIcon } from 'ui-kit/icons';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import {
  StageCircleColorLookup,
  StageIconColorLookup,
} from './Stage.constants';
import {
  Circle,
  PerpetratorWrapper,
  RevertStageButtonWrapper,
  StageInfoWrapper,
  StageLine,
  StageLineWrapper,
  StageNameWrapper,
  StagePanelWrapper,
  Wrapper,
} from './Stage.styled';
import { StageProps } from './Stage.types';

export const Stage: FC<StageProps> = ({
  stage,
  isLast,
  handleRevertStage,
  isRevertStageLoading,
  isShowRevertStageButton,
}) => {
  const { status, name, closingTime, perpetrator } = stage;

  const preparedClosingTime = closingTime
    ? getTimeStringByUTC(closingTime)
    : '-';

  const icon = useMemo(() => {
    const { status, number, type } = stage;
    const inProgress = status === EStageStatus.InProgress;

    const icons = [
      {
        show: status === EStageStatus.Done && type === EStageType.Common,
        icon: <OkIcon />,
      },
      {
        show:
          (inProgress && type === EStageType.Common) ||
          (status === EStageStatus.Waiting && type === EStageType.Common),
        icon: number,
      },
      {
        show: type === EStageType.Switch,
        icon: <ChoiceIcon />,
      },
      {
        show: type === EStageType.Final,
        icon: <FinishIcon />,
      },
    ];

    return icons.find((elem) => elem.show)?.icon;
  }, [stage]);

  const iconColor = StageIconColorLookup[status];
  const circleColor = StageCircleColorLookup[status];

  const inProgress = status === EStageStatus.InProgress;

  const isDone = status === EStageStatus.Done;
  const lineIsActive = isDone || inProgress;

  return (
    <Wrapper>
      <StagePanelWrapper>
        <Circle
          iconColor={iconColor}
          border={circleColor.border}
          background={circleColor.background}
        >
          {icon}
        </Circle>
        {!isLast && (
          <StageLineWrapper>
            <StageLine isActive={lineIsActive} />
          </StageLineWrapper>
        )}
      </StagePanelWrapper>

      <StageInfoWrapper isActive={inProgress}>
        <StageNameWrapper>{name}</StageNameWrapper>
        {perpetrator && (
          <PerpetratorWrapper>
            <div>{perpetrator.name}</div>
            <div>{preparedClosingTime}</div>
          </PerpetratorWrapper>
        )}
        {isShowRevertStageButton && (
          <RevertStageButtonWrapper>
            <Button
              type="ghost"
              size="s"
              onClick={handleRevertStage}
              disabled={isRevertStageLoading}
            >
              Вернуть этап
            </Button>
          </RevertStageButtonWrapper>
        )}
      </StageInfoWrapper>
    </Wrapper>
  );
};
