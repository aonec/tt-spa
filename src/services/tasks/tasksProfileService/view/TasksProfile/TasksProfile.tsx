import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '01/shared/ui/PageHeader';
import { SearchTasks } from '../SearchTasks';
import { TasksList } from '../TasksList';
import { PaginationSC, TabsSC, Wrapper } from './TasksProfile.styled';
import { TasksProfileProps } from './TasksProfile.types';
import { TaskGroupingFilter } from 'myApi';
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
  isSpectator,
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

  const tasksList = useMemo(() => <TasksList tasks={tasks} />, [tasks]);

  useEffect(() => {
    if (isSpectator && grouptype === TaskGroupingFilter.Executing) {
      history.push('/tasks/list/Observing');
    }
  });

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
        {!isSpectator && (
          <TabPane tab={executingTabText} key="Executing"></TabPane>
        )}
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
      <div>{!isLoading && tasksList}</div>
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
