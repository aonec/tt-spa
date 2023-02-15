import React, { FC, useEffect, useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '01/shared/ui/PageHeader';
import { SearchTasks } from '../SearchTasks';
import { TasksList } from '../TasksList';
import { PaginationSC, TabsSC, Wrapper } from './TasksProfile.styled';
import { TasksPageSegment, TasksProfileProps } from './TasksProfile.types';
import { TaskGroupingFilter } from 'myApi';
import { Segmented } from 'ui-kit/Segmented';
import { ListIcon, MapIcon } from 'ui-kit/icons';

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

  const [currentSegment, setCurrentSegment] =
    useState<TasksPageSegment>('list');

  return (
    <div>
      <PageHeader
        title="Задачи"
        contextMenu={{
          size: 'small',
          menuButtons: [
            {
              title: 'Выгрузить список задач',
              onClick: handleExportTasksList,
            },
          ],
        }}
      >
        <Segmented<TasksPageSegment>
          active={currentSegment}
          items={[
            {
              title: 'Список',
              name: 'list',
              icon: <ListIcon />,
            },
            {
              title: 'На карте',
              name: 'map',
              icon: <MapIcon />,
            },
          ]}
          onChange={setCurrentSegment}
        />
      </PageHeader>
      <TabsSC activeKey={grouptype} onChange={history.push}>
        {!isSpectator && (
          <TabPane tab={executingTabText} key="Executing"></TabPane>
        )}
        <TabPane tab={observingTabText} key="Observing"></TabPane>
        <TabPane tab="Архив" key="Archived"></TabPane>
      </TabsSC>
      <Wrapper>
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
    </div>
  );
};
