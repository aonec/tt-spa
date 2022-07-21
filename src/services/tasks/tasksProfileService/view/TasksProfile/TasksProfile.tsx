import React, { FC, useMemo } from 'react';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '01/shared/ui/PageHeader';
import { TasksList } from '01/_pages/Tasks/components/TasksList';
import { SearchTasks } from '../SearchTasks';
import { PaginationSC, TabsSC, Wrapper } from './TasksProfile.styled';
import { TasksProfileProps } from './TasksProfile.types';
const { TabPane } = TabsSC;

export const TasksProfile: FC<TasksProfileProps> = ({
  handleExportTasksList,
  tasks,
  grouptype,
  handleSearch,
  taskTypes,
  initialValues,
  changePageNumber,
  pagedTasks,
  isLoading,
  isExtendedSearchOpen,
  closeExtendedSearch,
  openExtendedSearch,
  clearFilters,
  changeFiltersByGroupType,
  housingManagments,
  perpetrators,
}) => {
  const history = useHistory();
  const { executingTasksCount, observingTasksCount, totalItems } =
    pagedTasks || {};

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
        isExtendedSearchOpen={isExtendedSearchOpen}
        closeExtendedSearch={closeExtendedSearch}
        openExtendedSearch={openExtendedSearch}
        clearFilters={clearFilters}
        changeFiltersByGroupType={changeFiltersByGroupType}
        housingManagments={housingManagments}
        perpetrators={perpetrators}
      />
      {!isLoading && tasksList}
      {isLoading && <Skeleton active />}
      {!isLoading && Boolean(tasks?.length) && (
        <PaginationSC
          defaultCurrent={1}
          onChange={changePageNumber}
          pageSize={20}
          total={totalItems}
          current={initialValues?.PageNumber}
          showSizeChanger={false}
        />
      )}
    </Wrapper>
  );
};
