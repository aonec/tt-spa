import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { CalculatorIcon, NumberIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import {
  CalendarIconSC,
  DeviceInfoWrapper,
  InfoBlockWrapper,
  InfoWrapper,
  Line,
  MapIconSC,
  NameRowWrapper,
  TaskItemWrapper,
  TaskNameWrapper,
  TextWrapper,
  TimeLine,
  TimeLineWrapper,
  TimerRowWrapper,
  TimeWrapper,
  UserIconSC,
} from './TasksListItem.styled';
import { IconLookup, TasksListItemProps } from './TasksListItem.types';

export const TasksListItem: FC<TasksListItemProps> = ({ task }) => {
  const {
    currentStage,
    name,
    timeline,
    timer,
    showExecutor,
    perpetrator,
    device,
    id,
    formatedCreationTime,
    address,
  } = task;
  const history = useHistory();

  const taskName = currentStage ? currentStage.name : name;
  const Icon = IconLookup.find((elem) => elem.icon === timer?.icon)?.element;

  return (
    <TaskItemWrapper onClick={() => history.push(`/tasks/profile/${id}`)}>
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
          <span>{timeline.deadlineDate}</span>
        </TimeLineWrapper>
      )}
      <TimerRowWrapper>
        <div>
          {Icon && <Icon />}
          <TextWrapper>{timer.statusDescription}</TextWrapper>
          <TimeWrapper fail={timer.stage?.isFailed}>
            {timer.stage?.remainingTime || timer.executionTime}
          </TimeWrapper>
          <span>{timer.stage?.deadlineDate || timer?.diffTime}</span>
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
              {device.resource && (
                <ResourceIconLookup resource={device.resource} />
              )}
              {!device.resource && <CalculatorIcon />}
              <TextWrapper>{device.model}</TextWrapper>
              <span>({device.serialNumber})</span>
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
  );
};
