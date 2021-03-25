import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Icon } from '01/components';
import { convertDate } from '01/_api/utils/convertDate';
import { DeviceContext } from '../index';
import {
  Task,
  StageName,
  TaskName,
  TaskRow,
  TasksTitle,
  TasksWrap,
} from '01/_components/Events';
import _ from 'lodash';

export const Events = ({ title = '', loading = true }) => {
  const { tasks, mistake } = useContext(DeviceContext);
  loading = !tasks;
  const tasksList = _.get(tasks, 'items', []);

  if (mistake) {
    return (
      <Link to="/tasks">
        <Task>
          <StageName style={{ color: 'red' }}>Произошла ошибка </StageName>
          <TaskName>Что-то пошло не так</TaskName>
          <TaskRow>
            <Icon icon="username2" style={{ marginRight: '8px' }} />
            Можете просмотреть все задачи
          </TaskRow>
        </Task>
      </Link>
    );
  }

  const NoEvents = () => {
    return (
      <Link to="/tasks">
        <Task>
          <StageName>Нет задач </StageName>
          <TaskName>Активных задач нет</TaskName>
          <TaskRow>
            <Icon icon="username2" style={{ marginRight: '8px' }} />
            Можете просмотреть все задачи
          </TaskRow>
        </Task>
      </Link>
    );
  };
  const TasksResult = tasksList.map((currentStage, perpetrator, id, name) => {
    const { startingTime, expectedCompletionTime } = currentStage;
    return (
      <Link key={id} to={`/tasks/${id}`}>
        <Task>
          <StageName>{currentStage.name}</StageName>
          <TaskName>{`Причина: ${name}`}</TaskName>
          <TaskRow>
            <Icon icon="timer" style={{ marginRight: '8px' }} />
            {`${convertDate(startingTime)} - ${convertDate(
              expectedCompletionTime
            )}`}
          </TaskRow>
          <TaskRow>
            <Icon icon="username2" style={{ marginRight: '8px' }} />
            {perpetrator.name}
          </TaskRow>
        </Task>
      </Link>
    );
  });
  return (
    <TasksWrap>
      <TasksTitle>{title}</TasksTitle>
      <Loader show={loading} size="32">
        {TasksResult.length > 1 ? <TasksResult /> : <NoEvents />}
      </Loader>
    </TasksWrap>
  );
};

export default Events;
