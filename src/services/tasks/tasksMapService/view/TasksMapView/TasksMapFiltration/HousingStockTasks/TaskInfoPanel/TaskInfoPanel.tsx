import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  createTimeline,
  createTimer,
} from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { Button } from 'ui-kit/Button';
import { CalculatorIcon } from 'ui-kit/icons';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { TimeLine } from 'ui-kit/shared/TimeLine';
import { Timer } from 'ui-kit/shared/Timer';
import {
  Description,
  DeviceNumber,
  DeviceSerialNumber,
  DeviceWrapper,
  FooterWrapper,
  ListWrapper,
  TimelineWrapper,
  TimerWrapper,
  Title,
  Wrapper,
} from './TaskInfoPanel.styled';
import { TaskInfoPanelProps } from './TaskInfoPanel.types';

export const TaskInfoPanel: FC<TaskInfoPanelProps> = ({ task }) => {
  const timeline = createTimeline(task);
  const timer = createTimer(task);

  return (
    <Wrapper>
      <Title>{task.name}</Title>
      <Description>{task.currentStage?.name}</Description>
      <TimelineWrapper>
        {timeline && <TimeLine timeline={timeline} isShowInfo={false} />}
      </TimelineWrapper>
      <TimerWrapper>
        <Timer timer={timer} />
      </TimerWrapper>
      <ListWrapper>
        <CommonInfo
          items={[
            {
              key: 'Тип неисправности',
              value: task.creationReason,
            },
            {
              key: 'Дата создания',
              value: dayjs(task.creationTime).format('DD.MM.YYYY'),
            },
            {
              key: 'Исполнитель',
              value: task.perpetrator?.name,
            },
          ]}
        />
      </ListWrapper>
      {task.pipeNode && (
        <DeviceWrapper>
          <ResourceIconLookup resource={task.pipeNode.resource} />
          <DeviceNumber>Узел {task.pipeNode.title}</DeviceNumber>
        </DeviceWrapper>
      )}
      {task.device && (
        <DeviceWrapper>
          {task.device.resource ? (
            <ResourceIconLookup resource={task.device.resource} />
          ) : (
            <CalculatorIcon />
          )}
          <DeviceNumber>{task.device.serialNumber}</DeviceNumber>
          <DeviceSerialNumber>({task.device.model})</DeviceSerialNumber>
        </DeviceWrapper>
      )}
      {task.individualDevices?.map((device) => (
        <DeviceWrapper key={device.id}>
          <ResourceIconLookup resource={device.resource} />
          <DeviceNumber>{device.serialNumber}</DeviceNumber>
          <DeviceSerialNumber>({device.model})</DeviceSerialNumber>
        </DeviceWrapper>
      ))}
      <FooterWrapper>
        <Link to={`/tasks/profile/${task.id}`}>
          <Button size="s">Перейти к задаче</Button>
        </Link>
      </FooterWrapper>
    </Wrapper>
  );
};
