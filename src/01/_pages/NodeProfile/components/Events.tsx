import React from 'react';
import { Loader, Icon } from '01/components';
import { convertDate } from '01/_api/utils/convertDate';
import { Button } from '01/_components/Button';
import {
  Task,
  StageName,
  TaskName,
  TaskRow,
  TasksWrap,
  TasksTitle,
} from '../../../tt-components/Events';
import { TaskListResponse } from '../../../../myApi';

const buttonHandler = () => {};

interface EventsInterface {
  title: string;
  tasks: TaskListResponse[];
}

export const Events = ({ title = '', tasks }: EventsInterface) => {
  const Tasks = (tasks || []).map((task, index) => {
    const { currentStage, perpetrator, id } = task;
    return (
      <Task key={id} href={`/tasks/${id}`}>
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
          {perpetrator.name}
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
        <StageName>Нет задач </StageName>
        <TaskName>задачи Узла завершены</TaskName>
        {/* <TaskRow>
            <Icon icon="username2" style={{ marginRight: '8px' }} />
            Можете просмотреть все задачи
          </TaskRow> */}
      </Task>
    </TasksWrap>
  );
};

export default Events;
