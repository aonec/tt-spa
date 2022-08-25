import _ from 'lodash';
import { EActResourceType } from 'myApi';
import React, { FC, useMemo } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { TimeLine } from 'ui-kit/shared_components/TimeLine';
import { Timer } from 'ui-kit/shared_components/Timer';
import {
  DeviceIconWrapper,
  HeaderWrapper,
  InfoWrapper,
  Line,
  PageHeaderWrapper,
  TimelineRowWrapper,
  TimerRowWrapper,
  Wrapper,
} from './TaskProfileHeader.styled';
import { TaskProfileHeaderProps } from './TaskProfileHeader.types';

export const TaskProfileHeader: FC<TaskProfileHeaderProps> = ({
  name,
  devices,
  timeline,
  timer,
  taskName,
}) => {
  const DeviceIcon = useMemo(() => {
    if (!devices) {
      return null;
    }
    const allDevicesResource = devices.map((device) => device.resource);
    const isUniq = _.uniq(allDevicesResource).length === 1;
    const iconType = isUniq ? devices[0].resource : EActResourceType.All;

    if (iconType) {
      return <ResourceIconLookup resource={iconType} />;
    }
    return <CalculatorIcon />;
  }, [devices]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <DeviceIconWrapper>{DeviceIcon}</DeviceIconWrapper>
        <PageHeaderWrapper>{name}</PageHeaderWrapper>
      </HeaderWrapper>
      {timeline && (
        <TimelineRowWrapper>
          <InfoWrapper>
            {taskName}
            <div>Время на задачу</div>
          </InfoWrapper>

          <TimeLine timeline={timeline} />
        </TimelineRowWrapper>
      )}
      <TimerRowWrapper>
        {!timeline && <Line isFailed={timer.isFailed || false} />}
        <Timer timer={timer} />
      </TimerRowWrapper>
    </Wrapper>
  );
};
