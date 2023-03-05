import moment from 'moment';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  createTimeline,
  createTimer,
} from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { Button } from 'ui-kit/Button';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { TimeLine } from 'ui-kit/shared_components/TimeLine';
import { Timer } from 'ui-kit/shared_components/Timer';
import {
  Description,
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
              value: moment(task.creationTime).format('DD.MM.YYYY'),
            },
            {
              key: 'Исполнитель',
              value: task.perpetrator?.name,
            },
          ]}
        />
      </ListWrapper>
      <FooterWrapper>
        <Link to={`/tasks/profile/${task.id}`}>
          <Button size="small">Перейти к задаче</Button>
        </Link>
      </FooterWrapper>
    </Wrapper>
  );
};
