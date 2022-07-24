import _ from 'lodash/fp';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CalculatorIcon,
  CalendarIcon,
  MapIcon,
  NumberIcon,
  UserIcon,
  XIcon,
} from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import {
  Infowrapper,
  Line,
  MapIconSC,
  NameRowWrapper,
  TaskItemWrapper,
  TaskNameWrapper,
  TextWrapper,
  TimeLine,
  TimeLineWrapper,
  TimerWrapper,
  TimeWrapper,
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
    calendar,
    address,
  } = task;
  const history = useHistory();

  const taskName = currentStage ? currentStage.name : name;
  const Icon = IconLookup.find((elem) => elem.key === timer?.icon)?.element;

  return (
    <TaskItemWrapper onClick={() => history.push(`/tasks/profile/${id}`)}>
      <NameRowWrapper>
        <TaskNameWrapper>{taskName}</TaskNameWrapper>
        <span>{currentStage && name}</span>
      </NameRowWrapper>
      {timeline && (
        <TimeLineWrapper>
          <TimeLine>
            <Line
              width={timeline.style.width}
              background={timeline.style.background}
            />
          </TimeLine>
          <TimeWrapper fail={timeline.fail}>{timeline.timeStr}</TimeWrapper>
          <span>{timeline.before}</span>
        </TimeLineWrapper>
      )}
      <TimerWrapper>
        {timer && (
          <div>
            {Icon && <Icon width="14px" />}
            <TextWrapper>{timer.text}</TextWrapper>
            <TimeWrapper fail={timer.stage?.fail}>
              {timer.stage?.timeStr || timer?.final?.timeStr}
            </TimeWrapper>
            <span>{timer.stage?.before || timer?.diff?.timeStr}</span>
          </div>
        )}
        {showExecutor && (
          <div>
            <UserIcon />
            <TextWrapper>{perpetrator?.name}</TextWrapper>
          </div>
        )}
      </TimerWrapper>
      <Infowrapper>
        {device && (
          <div>
            {device.resource && (
              <ResourceIconLookup resource={device.resource} />
            )}
            {!device.resource && <CalculatorIcon />}
            <TextWrapper>{device.model}</TextWrapper>
            <span>({device.serialNumber})</span>

            <MapIconSC />
            <TextWrapper>
              {getApartmentFromFullAddress(address, true)}
            </TextWrapper>
          </div>
        )}
        <div>
          <NumberIcon />
          <TextWrapper>{id}</TextWrapper>
          <CalendarIcon />
          <TextWrapper>{calendar}</TextWrapper>
        </div>
      </Infowrapper>
    </TaskItemWrapper>
  );
};
