import { Loader } from '01/components';
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
  initialValues,
  pagedTasks,
  isLoading,
}) => {
  const history = useHistory();
  const { executingTasksCount, observingTasksCount } = pagedTasks || {};

  const executingTabText = executingTasksCount
    ? `К исполнению (${executingTasksCount})`
    : 'К исполнению';
  const observingTabText = observingTasksCount
    ? `Наблюдаемые (${observingTasksCount})`
    : 'Наблюдаемые';

  const tasksList = useMemo(() => <TasksList items={tasks} />, [tasks]);

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
        <TabPane tab={executingTabText} key="Executing"></TabPane>
        <TabPane tab={observingTabText} key="Observing"></TabPane>
        <TabPane tab="Архив" key="Archived"></TabPane>
      </TabsSC>
      <SearchTasks
        onSubmit={handleSearch}
        taskTypes={taskTypes}
        currentFilter={initialValues}
      />
      {!isLoading && tasksList}
      {isLoading && <Loader show size="32" />}
    </Wrapper>
  );
};
