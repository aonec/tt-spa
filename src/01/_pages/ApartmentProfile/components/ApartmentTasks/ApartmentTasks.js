import React from 'react';
import styled from 'styled-components';
import { Icon } from '01/components/Icon';
// import moment from "moment";
// import "moment/locale/ru";
import { Button } from '../Button';

import { convertDate } from '../../utils/utils';

// moment.locale("ru");

export const ApartmentTasks = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

export const ApartmentTasksTitle = styled.h2`
  padding-bottom: 24px;
  margin: 0;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
`;
export const ApartmentTask = styled.a`
  padding: 0;
  padding-top: 32px;
  margin: 0;
  &:first-of-type {
    padding: 0;
  }
`;
export const ApartmentTaskTitle = styled.h3`
  font-size: 14px;
  line-height: 16px;
`;

export const ApartmentTaskState = styled.p`
  padding: 0;
  padding-top: 8px;
  margin: 0;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  color: #17b45a;
`;

export const ApartmentTaskDate = styled.p`
  padding: 0;
  padding-top: 8px;
  margin: 0;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

export const Tasks = (props) => {
  const tasksArr = Object.values(props.tasksList);
  console.log('tasksList', tasksArr)

  // const TasksList = tasksArr.map((value, index) => {
  const TasksList = tasksArr.filter((item, index) => [0, 4, 8].includes(index)).map((task, ind) => {
    const {
      creationTime,
      closingTime,
      expectedCompletionTime,
      name,
    } = task;
    const begin = convertDate(creationTime);
    const end = convertDate(closingTime || expectedCompletionTime);

    return (
      <ApartmentTask key={ind}>
        <ApartmentTaskTitle>{name}</ApartmentTaskTitle>
        <ApartmentTaskState>
          <Icon icon="ok"/>
          Выполнено
        </ApartmentTaskState>
        <ApartmentTaskDate>
          <Icon icon="calendar"/>
          {`${begin} - ${end}`}
        </ApartmentTaskDate>
      </ApartmentTask>
    );
  });

  return (
    <ApartmentTasks>
      <ApartmentTasksTitle>Задачи с объектом</ApartmentTasksTitle>
      {TasksList}
      <Button>Все задачи с объектом</Button>
    </ApartmentTasks>

  );
};
