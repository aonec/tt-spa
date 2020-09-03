import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { Loader, Icon } from '01/components';
import { convertDate } from '01/_api/utils/convertDate';
import { Button } from '01/_components/Button';
import { DeviceContext } from '../DeviceProfile';

const Template = styled.div``;

const Task = styled.a`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: fit-content;

  &:hover {

    padding: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1); 
    
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
    const TasksResult = tasksList.map((task, index) => {
      const { currentStage, perpetrator, id } = task;
      return (
        <Task key={id} href={`/tasks/${id}`}>
          <StageName>{currentStage.name}</StageName>
          <TaskName>
            Причина:
            {task.name}
          </TaskName>
          <TaskRow>
            <Icon icon="timer" style={{ marginRight: '8px' }} />
            {`${convertDate(currentStage.startingTime)} - ${convertDate(currentStage.expectedCompletionTime)}`}
          </TaskRow>
          <TaskRow>
            <Icon icon="username2" style={{ marginRight: '8px' }} />
            {perpetrator.name}
          </TaskRow>
        </Task>
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
  return <Loader size="32" />;
};
