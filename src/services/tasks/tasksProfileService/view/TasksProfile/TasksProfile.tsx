import { PageHeader } from '01/shared/ui/PageHeader';
import { TasksList } from '01/_pages/Tasks/components/TasksList';
import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchTasks } from '../SearchTasks';
import { TabsSC, Wrapper } from './TasksProfile.styled';
import { TasksProfileProps } from './TasksProfile.types';
const { TabPane } = TabsSC;

export const TasksProfile: FC<TasksProfileProps> = ({
  handleExportTasksList,
  tasks,
  grouptype,
  handleSearch,
  taskTypes,
  executingTasksCount,
  observingTasksCount,
}) => {
  const history = useHistory();

  const executingTabText = executingTasksCount
    ? `К исполнению (${executingTasksCount})`
    : 'К исполнению';
  const observingTabText = observingTasksCount
    ? `Наблюдаемые (${observingTasksCount})`
    : 'Наблюдаемые';

  const tasksList = useMemo(() => <TasksList items={tasks}/>, [tasks]);

  return (
    <Wrapper>
      <PageHeader
        title="Задачи"
        contextMenu={{
          menuButtons: [
            {
              title: 'Выгрузить список задач',
              onClick: handleExportTasksList,
            },
          ],
        }}
      />
      <TabsSC activeKey={grouptype} onChange={history.push}>
        <TabPane tab={executingTabText} key="executing"></TabPane>
        <TabPane tab={observingTabText} key="observing"></TabPane>
        <TabPane tab="Архив" key="archived"></TabPane>
      </TabsSC>
      <SearchTasks onSubmit={handleSearch} taskTypes={taskTypes} />
      {tasksList}
    </Wrapper>
  );
};
