import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Loader, Icon } from '01/components';
import { convertDate } from '01/_api/utils/convertDate';
import { Button } from '01/_components/Button';
import { DeviceContext } from '../IndividualDevice';

const Template = styled.div``;

const Task = styled.div`
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

const StageName = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.85);
`;
const TasksWrap = styled.div`
  padding-left: 40px;
`;

const TaskName = styled.p`
  color: rgba(39, 47, 90, 0.45);
  font-size: 12px;
  line-height: 16px;
`;

const TaskRow = styled.div`
  padding-top: 8px;
  color: rgba(39, 47, 90, 0.6);
  display: inline-flex;
  align-items: center;
`;

const TasksTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  padding-bottom: 14px;
`;

const buttonHandler = () => {
  console.log('buttonHandler');
};
export const Events = ({ title = '', loading = true }) => {
  const { tasks } = useContext(DeviceContext);

  if (tasks) {
    const tasksList = tasks.items;
    // console.log(tasksList);

    if (tasksList.length > 0) {
      console.log(tasksList.length);

      const TasksResult = tasksList.map((task, index) => {
        const { currentStage, perpetrator, id } = task;
        return (
          <Link key={id} to={`/tasks/${id}`}>
            <Task>
              <StageName>{currentStage.name}</StageName>
              <TaskName>
                Причина:
                {task.name}
              </TaskName>
              <TaskRow>
                <Icon icon="timer" style={{ marginRight: '8px' }} />
                {`${convertDate(currentStage.startingTime)} - ${convertDate(
                  currentStage.expectedCompletionTime,
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
          {TasksResult}
          <Button onClick={buttonHandler}>Все задачи с объектом</Button>
        </TasksWrap>
      );
    }

    return (
      <TasksWrap>
        <TasksTitle>{title}</TasksTitle>
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
      </TasksWrap>
    );
  }
  return <Loader size="32" />;
};

export default Events;
