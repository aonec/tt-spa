import React, { FC, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from 'ui-kit/shared/PageHeader';
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
} from './TasksProfile.styled';
import { useUnit } from 'effector-react';
import { Empty } from 'antd';
import { TaskGroupingFilter } from 'api/types';
import { Segmented } from 'ui-kit/Segmented';
import { ListIcon, MapIcon } from 'ui-kit/icons';
import { TasksMapContainer } from 'services/tasks/tasksMapService';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { TasksPageSegment, TasksProfileProps } from './TasksProfile.types';
import { Button } from 'ui-kit/Button';

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
  const { featureToggles } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
  });

  const history = useHistory();
  const { executingTasksCount, observingTasksCount, totalItems } =
    pagedTasks || {};

  const isHaveExecutingTasks = Boolean(executingTasksCount);

  const executingTabText = isHaveExecutingTasks
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

  const tabItems = useMemo(
    () => [
      ...(!isSpectator
        ? [
            {
              label: executingTabText,
              key: TaskGroupingFilter.Executing,
            },
          ]
        : []),
      {
        label: observingTabText,
        key: TaskGroupingFilter.Observing,
      },
      {
        label: isPermissionToAddTask ? 'Закрытые' : 'Архив',
        key: TaskGroupingFilter.Archived,
      },
    ],
    [isSpectator, executingTabText, observingTabText, isPermissionToAddTask],
  );

  return (
    <Wrapper>
      {tasksPageSegment === 'map' && header}
      {tasksPageSegment === 'list' && (
        <div>
          <FiltrationWrapper>
            <HeaderContainer>
              {header}
              {featureToggles.dispatcherAddTask && isPermissionToAddTask && (
                <Flex>
                  <Button onClick={handleOpenAddTaskModal}>
                    + Создать задачу
                  </Button>
                </Flex>
              )}
            </HeaderContainer>

            <ContentWrapper>
              <TabsSC
                activeKey={grouptype}
                onChange={history.push}
                items={tabItems}
              />
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
