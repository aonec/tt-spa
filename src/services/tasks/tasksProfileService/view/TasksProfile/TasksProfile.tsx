import React, { FC, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { SearchTasks } from '../SearchTasks';
import { TasksList } from '../TasksList';
import {
  FiltrationWrapper,
  PaginationSC,
  TabsSC,
  ContentWrapper,
  Wrapper,
  HeaderWrapper,
  HeaderContainer,
  Flex,
  ButtonSC,
} from './TasksProfile.styled';
import { TasksPageSegment, TasksProfileProps } from './TasksProfile.types';
import { Segmented } from 'ui-kit/Segmented';
import { ListIcon, MapIcon, PlusSmallIcon } from 'ui-kit/icons';
import { TasksMapContainer } from 'services/tasks/tasksMapService';
import { Empty } from 'antd';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
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
  tasksPageSegment,
  setTasksPageSegment,
  handleOpenAddTaskModal,
  isPermissionToAddTask,
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

  const header = (
    <HeaderWrapper isList={tasksPageSegment === 'list'}>
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
          active={tasksPageSegment}
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
          onChange={setTasksPageSegment}
        />
      </PageHeader>
    </HeaderWrapper>
  );

  return (
    <Wrapper>
      {tasksPageSegment === 'map' && header}
      {tasksPageSegment === 'list' && (
        <div>
          <FiltrationWrapper>
            <HeaderContainer>
              {header}
              {isPermissionToAddTask && (
                <Flex>
                  <ButtonSC
                    size="small"
                    type="ghost"
                    onClick={handleOpenAddTaskModal}
                  >
                    <PlusSmallIcon />
                  </ButtonSC>
                </Flex>
              )}
            </HeaderContainer>

            <ContentWrapper>
              <TabsSC activeKey={grouptype} onChange={history.push}>
                {!isSpectator && (
                  <TabPane
                    tab={executingTabText}
                    key={TaskGroupingFilter.Executing}
                  ></TabPane>
                )}
                <TabPane
                  tab={observingTabText}
                  key={TaskGroupingFilter.Observing}
                ></TabPane>
                <TabPane
                  tab="Архив"
                  key={TaskGroupingFilter.Archived}
                ></TabPane>
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
            </ContentWrapper>
          </FiltrationWrapper>
          <ContentWrapper>
            <WithLoader isLoading={isLoading}>
              {Boolean(tasks?.length) ? (
                tasksList
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Нет задач"
                />
              )}
            </WithLoader>
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
          </ContentWrapper>
        </div>
      )}
      {tasksPageSegment === 'map' && <TasksMapContainer />}
    </Wrapper>
  );
};
