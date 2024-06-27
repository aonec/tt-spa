import _ from 'lodash';
import { EActResourceType } from 'api/types';
import React, { FC, useMemo } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { TimeLine } from 'ui-kit/shared/TimeLine';
import { Timer } from 'ui-kit/shared/Timer';
import { LineColors } from './TaskProfileHeader.constants';
import {
  DeviceIconWrapper,
  HeaderWrapper,
  InfoWrapper,
  Line,
  PageHeaderWrapper,
  TaskNamePanel,
  TimelineRowWrapper,
  TimerRowWrapper,
  Wrapper,
} from './TaskProfileHeader.styled';
import { TaskProfileHeaderProps } from './TaskProfileHeader.types';
import { EmergencyPanel } from 'services/tasks/tasksProfileService/view/TasksListItem/EmergencyPanel';

export const TaskProfileHeader: FC<TaskProfileHeaderProps> = ({
  name,
  devices,
  nodeDevice,
  timeline,
  timer,
  taskName,
  pipeNode,
  isEmergency,
}) => {
  const lineColor = timer.closingStatus && LineColors[timer.closingStatus];

  const DeviceIcon = useMemo(() => {
    if (!devices.length && !nodeDevice && !pipeNode) {
      return null;
    }
    const existingResource =
      devices[0]?.resource ||
      nodeDevice?.resource ||
      pipeNode?.resource ||
      null;

    const allDevicesResource = devices.map((device) => device?.resource);
    const isNotUniq = _.uniq(allDevicesResource).length > 1;
    const iconType = isNotUniq ? EActResourceType.All : existingResource;

    if (iconType) {
      return <ResourceIconLookup resource={iconType} />;
    }
    return <CalculatorIcon />;
  }, [devices, nodeDevice, pipeNode]);

  const stageStatusDescription = timer.statusDescription;

  return (
    <Wrapper>
      <HeaderWrapper>
        {DeviceIcon && <DeviceIconWrapper>{DeviceIcon}</DeviceIconWrapper>}
        <PageHeaderWrapper>{name}</PageHeaderWrapper>
      </HeaderWrapper>
      {timeline && (
        <TimelineRowWrapper>
          <InfoWrapper>
            <TaskNamePanel>
              {isEmergency && <EmergencyPanel />}
              {taskName}
            </TaskNamePanel>
            <div>{stageStatusDescription}</div>
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
