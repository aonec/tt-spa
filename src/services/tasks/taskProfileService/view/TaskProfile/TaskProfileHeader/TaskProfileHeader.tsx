import _ from 'lodash';
import { EActResourceType } from 'myApi';
import React, { FC, useMemo } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { TimeLine } from 'ui-kit/shared_components/TimeLine';
import { Timer } from 'ui-kit/shared_components/Timer';
import { TimerClosingStatus } from 'ui-kit/shared_components/Timer/Timer.types';
import { LineColors } from './TaskProfileHeader.constants';
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
  nodeDevice,
  timeline,
  timer,
  taskName,
}) => {
  const lineColor = timer.closingStatus && LineColors[timer.closingStatus];

  const DeviceIcon = useMemo(() => {
    if (!devices.length && !nodeDevice) {
      return null;
    }
    const existingResource =
      devices[0]?.resource || nodeDevice?.resource || null;

    const allDevicesResource = devices.map((device) => device.resource);
    const isNotUniq = _.uniq(allDevicesResource).length > 1;
    const iconType = isNotUniq ? EActResourceType.All : existingResource;

    if (iconType) {
      return <ResourceIconLookup resource={iconType} />;
    }
    return <CalculatorIcon />;
  }, [devices, nodeDevice]);

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
        {!timeline && <Line color={lineColor} />}
        <Timer timer={timer} />
      </TimerRowWrapper>
    </Wrapper>
  );
};
