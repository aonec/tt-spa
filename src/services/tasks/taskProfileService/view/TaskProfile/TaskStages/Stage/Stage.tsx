import moment from 'moment';
import { EStageStatus, EStageType } from 'myApi';
import React, { FC, useMemo } from 'react';
import { MapIconSC } from 'services/tasks/tasksProfileService/view/TasksListItem/TasksListItem.styled';
import { ChoiceIcon, FinishIcon, OkIcon } from 'ui-kit/icons';
import {
  StageCircleColorLookup,
  StageIconColorLookup,
} from './Stage.constants';
import {
  Circle,
  PerpetratorWrapper,
  StageInfoWrapper,
  StageLine,
  StageLineWrapper,
  StageNameWrapper,
  Wrapper,
} from './Stage.styled';
import { StageProps } from './Stage.types';

export const Stage: FC<StageProps> = ({ stage, isLast }) => {
  const { number, status, type, name, closingTime, perpetrator } = stage;

  const preparedClosingTime = moment(closingTime).format('DD.MM.YYYY HH:MM');

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

  const isActive = status === EStageStatus.InProgress;

  return (
    <Wrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Circle
          iconColor={iconColor}
          border={circleColor.border}
          background={circleColor.background}
        >
          {icon}
        </Circle>
        {!isLast && (
          <StageLineWrapper>
            <StageLine />
          </StageLineWrapper>
        )}
      </div>

      <StageInfoWrapper isActive={isActive || false}>
        <StageNameWrapper>{name}</StageNameWrapper>
        {!isActive && perpetrator && (
          <PerpetratorWrapper>
            {perpetrator.name} <div>{preparedClosingTime}</div>
          </PerpetratorWrapper>
        )}
      </StageInfoWrapper>
    </Wrapper>
  );
};
