import React, { useContext } from 'react';
import _ from 'lodash';
import { Loader, Icon } from '01/components';
import { convertDate } from '01/_api/utils/convertDate';
import { Button } from '01/_components/Button';
import {
  StageName,
  Task,
  TaskName,
  TaskRow,
  TasksTitle,
  TasksWrap,
} from '../../../tt-components';
import { TaskListResponse, TasksPagedList } from '../../../../myApi';

interface EventsInterface {
  title: string;
  tasks: TaskListResponse[] | null;
}

export const Events = ({ title = '', tasks }: EventsInterface) => {
  if (!tasks) {
    return null;
  }
  const Tasks = (tasks || []).map((task, index) => {
    const { currentStage, perpetrator, id } = task;
    if (!currentStage) {
      return null;
    }

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

  if (tasks.length > 0) {
    return (
      <TasksWrap>
        <TasksTitle>{title}</TasksTitle>
        {Tasks}
        {/*<Button>Все задачи с объектом</Button>*/}
      </TasksWrap>
    );
  }

  return (
    <TasksWrap>
      <TasksTitle>{title}</TasksTitle>
      <Task>
        <StageName>Нет задач </StageName>
        <TaskName>задачи ОДПУ завершены</TaskName>
      </Task>
    </TasksWrap>
  );
};

export default Events;
