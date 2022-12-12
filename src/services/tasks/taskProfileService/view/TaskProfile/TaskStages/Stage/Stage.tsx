import { useStore } from 'effector-react';
import { EStageStatus, EStageType } from 'myApi';
import React, { FC, useMemo } from 'react';
import { currentUserService } from 'services/currentUserService';
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
  canRevertStage,
  handleRevertStage,
  isRevertStageLoading,
}) => {
  const { number, status, type, name, closingTime, perpetrator } = stage;

  const currentUser = useStore(currentUserService.outputs.$currentUser);

  const preparedClosingTime = closingTime
    ? getTimeStringByUTC(closingTime)
    : '-';

  const icon = useMemo(() => {
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
  const isPerpetrator = perpetrator?.id === currentUser?.id;

  const isShowRevertStageButton = isPerpetrator && canRevertStage;

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
        {!inProgress && perpetrator && (
          <PerpetratorWrapper>
            <div>{perpetrator.name}</div>
            <div>{preparedClosingTime}</div>
          </PerpetratorWrapper>
        )}
        {isShowRevertStageButton && (
          <RevertStageButtonWrapper>
            <Button
              type="ghost"
              size="small"
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
