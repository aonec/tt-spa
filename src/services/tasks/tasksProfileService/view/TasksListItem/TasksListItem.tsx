import _ from 'lodash';
import { EActResourceType, EResourceType } from 'myApi';
import React, { FC, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CalculatorIcon, NumberIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { IconLookup } from './TasksListItem.constants';
import {
  CalendarIconSC,
  DeviceInfoWrapper,
  InfoBlockWrapper,
  InfoWrapper,
  Line,
  MapIconSC,
  NameRowWrapper,
  SerialNumberWrapper,
  TaskItemWrapper,
  TaskNameWrapper,
  TextWrapper,
  TimeLine,
  TimeLineWrapper,
  TimerRowWrapper,
  TimeWrapper,
  UserIconSC,
} from './TasksListItem.styled';
import { TasksListItemProps } from './TasksListItem.types';

export const TasksListItem: FC<TasksListItemProps> = ({ task }) => {
  const {
    currentStage,
    name,
    timeline,
    timer,
    showExecutor,
    perpetrator,
    devices,
    id,
    formatedCreationTime,
    address,
  } = task;

  const history = useHistory();

  const taskName = currentStage ? currentStage.name : name;
  const Icon = IconLookup.find((elem) => elem.icon === timer?.icon)?.element;

  const device = devices ? devices[0] : null

  const DeviceIcon = useMemo(() => {
    if (!devices) {
      return null;
    }

    const device = devices[0]

    const allDevicesResource = devices.map((device) => device.resource);
    const isUniq = _.uniq(allDevicesResource).length === 1;
    const iconType = isUniq ? device.resource : EActResourceType.All;

    if (iconType) {
      return <ResourceIconLookup resource={iconType} />;
    }
    return <CalculatorIcon />;
  }, [device]);

  return (
    <Link to={`/tasks/profile/${id}`}>
      <TaskItemWrapper>
        <NameRowWrapper>
          <TaskNameWrapper className="task-item-title">
            {taskName}
          </TaskNameWrapper>
          <span>{currentStage && name}</span>
        </NameRowWrapper>
        {timeline && (
          <TimeLineWrapper>
            <TimeLine>
              <Line
                width={timeline.timelineStyle.width}
                background={timeline.timelineStyle.color}
              />
            </TimeLine>
            <TimeWrapper fail={timeline.isFailed}>
              {timeline.remainingTime}
            </TimeWrapper>
            <TimeWrapper>{timeline.deadlineDate}</TimeWrapper>
          </TimeLineWrapper>
        )}
        <TimerRowWrapper>
          <div>
            {Icon && <Icon />}
            <TimeWrapper className="status" fail={timer?.isFailed}>
              {timer.statusDescription}
            </TimeWrapper>
            {!timer?.isFailed && (
              <TimeWrapper fail={timer.stage?.isFailed}>
                {timer.stage?.remainingTime || timer?.executionTime}
              </TimeWrapper>
            )}
            <TimeWrapper fail={timer?.isFailed}>
              {timer.stage?.deadlineDate || timer?.diffTime}
            </TimeWrapper>
          </div>
          {showExecutor && (
            <>
              <UserIconSC />
              <TextWrapper>{perpetrator?.name}</TextWrapper>
            </>
          )}
        </TimerRowWrapper>
        <InfoWrapper>
          <InfoBlockWrapper>
            {device && (
              <DeviceInfoWrapper>
                {DeviceIcon}
                <SerialNumberWrapper>{device.serialNumber}</SerialNumberWrapper>
                <TextWrapper>{device.model}</TextWrapper>
              </DeviceInfoWrapper>
            )}

            <MapIconSC />
            <TextWrapper>
              {getApartmentFromFullAddress(address, true)}
            </TextWrapper>
          </InfoBlockWrapper>
          <div>
            <NumberIcon />
            <TextWrapper>{id}</TextWrapper>
            <CalendarIconSC />
            <TextWrapper>{formatedCreationTime}</TextWrapper>
          </div>
        </InfoWrapper>
      </TaskItemWrapper>
    </Link>
  );
};
