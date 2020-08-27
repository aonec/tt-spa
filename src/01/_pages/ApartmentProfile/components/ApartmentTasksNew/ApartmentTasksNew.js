import React from 'react'
import styled from 'styled-components';
import { Icon } from '01/components/Icon'

const ApartmentTasks = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;
const ApartmentTasksTitle = styled.h2`
  padding-bottom: 24px;
  margin: 0;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
`;
const ApartmentTask = styled.a`
  padding: 0;
  padding-top: 32px;
  margin: 0;
  &:first-of-type {
    padding: 0;
  }
`;
const ApartmentTaskTitle = styled.h3`
  font-size: 14px;
  line-height: 16px;
`;

const ApartmentTaskState = styled.p`
  padding: 0;
  padding-top: 8px;
  margin: 0;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  color: #17b45a;
`;

const ApartmentTaskDate = styled.p`
  padding: 0;
  padding-top: 8px;
  margin: 0;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

export const ApartmentTasksNew = () => {
// export const TasksNew = tasksArr.map((value, index) => {
  // const begin = moment(tasksArr[index].creationTime).format(
  //   "DD.MM.YYYY, hh:mm"
  // );
  // const ending = moment(
  //   tasksArr[index].closingTime || tasksArr[index].expectedCompletionTime
  // ).format("DD.MM.YYYY, hh:mm");
  return (
    // <ApartmentTask key={index}>
    <ApartmentTask>
      {/*<ApartmentTaskTitle>{tasksArr[index].name}</ApartmentTaskTitle>*/}
      <ApartmentTaskTitle>ApartmentTaskTitle</ApartmentTaskTitle>
      <ApartmentTaskState>
        <Icon icon="ok"/>
        Выполнено
      </ApartmentTaskState>
      <ApartmentTaskDate>
        <Icon icon="calendar"/>
        {/*{begin}*/}
        {/*&nbsp;-&nbsp;*/}
        {/*{ending}*/}
      </ApartmentTaskDate>
    </ApartmentTask>
  );
}
