import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Loader, Icon } from '01/components';
import { convertDate } from '01/_api/utils/convertDate';
import { Button } from '01/_components/Button';
import { ApartmentContext } from '../../ApartmentProfile';
import { Task, StageName, TasksWrap, TaskName, TaskRow, TasksTitle } from '01/_components/Events'

const Template = styled.div``;


const buttonHandler = () => {
  console.log('buttonHandler');
};

const NoTasks = () => {
  return (
    <Link to="/tasks">
      <Task>
        <StageName>Нет задач </StageName>
        <TaskName>Активных задач нет</TaskName>
        <TaskRow>
          <Icon icon="username2" style={{ marginRight: '8px' }}/>
          Можете просмотреть все задачи
        </TaskRow>
      </Task>
    </Link>
  )
}

export const Events = ({ title = '', loading = true }) => {

  const { tasks } = useContext(ApartmentContext);

  loading = !tasks;

  // if (loading) { return }
  // const taskList = _.get(tasks, 'items', []);
  // return taskList.map(() => {...})

  if (loading) {
    return <Loader show={loading} size="32"/>
  }

  // if (tasks) {
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
              <Icon icon="timer" style={{ marginRight: '8px' }}/>
              {`${convertDate(currentStage.startingTime)} - ${convertDate(
                currentStage.expectedCompletionTime,
              )}`}
            </TaskRow>
            <TaskRow>
              <Icon icon="username2" style={{ marginRight: '8px' }}/>
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
      <NoTasks/>
    </TasksWrap>
  );
}
// return <Loader show={loading} size="32" />;
// };

export default Events;


// const Task = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 10px;
//   width: fit-content;
//
//   &:hover {
//     color: #40a9ff;
//     padding: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     div {
//       color: #40a9ff;
//     }
//   }
// `;
//
// const StageName = styled.h3`
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 16px;
//   color: rgba(0, 0, 0, 0.85);
// `;
// const TasksWrap = styled.div`
//   padding-left: 40px;
// `;
//
// const TaskName = styled.p`
//   color: rgba(39, 47, 90, 0.45);
//   font-size: 12px;
//   line-height: 16px;
// `;
//
// const TaskRow = styled.div`
//   padding-top: 8px;
//   color: rgba(39, 47, 90, 0.6);
//   display: inline-flex;
//   align-items: center;
// `;
//
// const TasksTitle = styled.h2`
//   font-size: 24px;
//   line-height: 32px;
//   padding-bottom: 14px;
// `;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { Icon } from '01/components/Icon';
// import { Button } from '../Button';
// import { convertDate } from '../../../../_api/utils/convertDate';
//
// export const Index = styled.div`
//   padding: 0 16px;
//   display: flex;
//   flex-direction: column;
// `;
//
// export const ApartmentTasksTitle = styled.h2`
//   padding-bottom: 24px;
//   margin: 0;
//   font-weight: normal;
//   font-size: 24px;
//   line-height: 32px;
// `;
// export const ApartmentTask = styled.a`
//   padding: 0;
//   padding-top: 32px;
//   margin: 0;
//   &:first-of-type {
//     padding: 0;
//   }
// `;
// export const ApartmentTaskTitle = styled.h3`
//   font-size: 14px;
//   line-height: 16px;
// `;
//
// const ApartmentTaskState = styled.div`
//   padding: 0;
//   padding-top: 8px;
//   margin: 0;
//   display: flex;
//   font-size: 12px;
//   line-height: 16px;
//   color: ${(props) => props.color};
// `;
//
// export const ApartmentTaskDate = styled.p`
//   padding: 0;
//   padding-top: 8px;
//   margin: 0;
//   display: flex;
//   font-size: 12px;
//   line-height: 16px;
//   color: rgba(39, 47, 90, 0.6);
// `;
//
// export const Tasks = (props) => {
//   const tasksArr = Object.values(props.tasksList);
//
//   const buttonHandler = () => {};
//   // const TasksList = tasksArr.map((value, index) => {
//   // const TasksList = tasksArr.filter((item, index) => [0, 4, 8].includes(index)).map((task, ind) => {
//   const TasksList = tasksArr.map((task, ind) => {
//     const {
//       id,
//       creationTime,
//       closingTime,
//       expectedCompletionTime,
//       name,
//       currentStage,
//     } = task;
//     const begin = convertDate(creationTime);
//     const end = convertDate(closingTime || expectedCompletionTime);
//
//     let status;
//     let icon;
//     let color;
//
//     if (currentStage.status === 'InProgress') {
//       status = 'В работе';
//       icon = 'replacement';
//       color = '#E2B104';
//     } else {
//       status = 'Выполнено';
//       icon = 'ok';
//       color = '#17b45a';
//     }
//
//     const taskHandler = () => {
//       console.log('taskHandler');
//     };
//
//     return (
//       <Link to={`/Tasks/${id}`}>
//         <ApartmentTask key={ind} onClick={taskHandler}>
//           <ApartmentTaskTitle>{name}</ApartmentTaskTitle>
//           <ApartmentTaskState color={color}>
//             <Icon icon={icon} />
//             {status}
//           </ApartmentTaskState>
//           <ApartmentTaskDate>
//             <Icon icon="calendar" />
//             {`${begin} - ${end}`}
//           </ApartmentTaskDate>
//         </ApartmentTask>
//       </Link>
//     );
//   });
//
//   return (
//     <Index>
//       <ApartmentTasksTitle>Задачи с объектом</ApartmentTasksTitle>
//       {TasksList}
//       <Button onClick={buttonHandler}>Все задачи с объектом</Button>
//     </Index>
//   );
// };
