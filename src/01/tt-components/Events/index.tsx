import styled from 'styled-components';

import React from 'react';
import { Icon } from '01/components';
import { convertDate } from '01/_api/utils/convertDate';
import { Button } from '01/_components/Button';
import { TaskListResponse } from '../../../myApi';

export interface EventsInterface {
  title: string;
  tasks: TaskListResponse[] | null;
}

export const Events = ({ title = '', tasks = [] }: EventsInterface) => {
  const buttonHandler = () => {};

  const Tasks = (tasks || []).map((task, index) => {
    const { currentStage, perpetrator, id } = task;
    if (!currentStage) {
      return null;
    }
    return (
      <Task key={id} href={`/tasks/profile/${id}`}>
        <StageName>{currentStage.name}</StageName>
        <TaskName>{`Причина: ${task.name}`}</TaskName>
        <TaskRow>
          <Icon icon="timer" style={{ marginRight: '8px' }} />
          {`${convertDate(currentStage.startingTime)} - ${convertDate(
            currentStage.expectedCompletionTime
          )}`}
        </TaskRow>
        <TaskRow>
          <Icon icon="username2" style={{ marginRight: '8px' }} />
          {perpetrator?.name}
        </TaskRow>
      </Task>
    );
  });
  if (Tasks.length > 0) {
    return (
      <TasksWrap>
        <TasksTitle>{title}</TasksTitle>
        {Tasks}
        <Button onClick={buttonHandler}>Все задачи с объектом</Button>
      </TasksWrap>
    );
  }

  return (
    <TasksWrap>
      <TasksTitle>{title}</TasksTitle>
      <Task>
        <StageName>Нет задач</StageName>
        <TaskName>задачи завершены</TaskName>
      </Task>
    </TasksWrap>
  );
};

export default Events;

export const Task = styled.a`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: fit-content;

  &:hover {
    color: #40a9ff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    div {
      color: #40a9ff;
    }
  }
`;

export const StageName = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.85);
`;
export const TasksWrap = styled.div`
  padding-left: 40px;
`;

export const TaskName = styled.p`
  color: rgba(39, 47, 90, 0.45);
  font-size: 12px;
  line-height: 16px;
`;

export const TaskRow = styled.div`
  padding-top: 8px;
  color: rgba(39, 47, 90, 0.6);
  display: inline-flex;
  align-items: center;
`;

export const TasksTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  padding-bottom: 14px;
`;
