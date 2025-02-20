import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { TasksSummary } from '../TasksSummary';
import { TasksControls } from './TasksControls';

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
  tasksSummaryData,
  isPermissionToShowSummary,
  selectedTasks,
  toggleTaskCheckbox,
  setSelectedTasks,
}) => {
  const { featureToggles } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
  });

  const navigate = useNavigate();
  const { executingTasksCount, observingTasksCount, totalItems } =
    pagedTasks || {};

  const isHaveExecutingTasks = Boolean(executingTasksCount);

  const executingTabText = isHaveExecutingTasks
    ? `К исполнению (${executingTasksCount})`
    : 'К исполнению';
  const observingTabText = observingTasksCount
    ? `Наблюдаемые (${observingTasksCount})`
    : 'Наблюдаемые';

  const tasksList = useMemo(
    () => (
      <TasksList
        tasks={tasks}
        selectedTasks={selectedTasks}
        toggleTaskCheckbox={toggleTaskCheckbox}
      />
    ),
    [tasks, selectedTasks, toggleTaskCheckbox],
  );

  useEffect(() => {
    if (isSpectator && grouptype === TaskGroupingFilter.Executing) {
      navigate('/tasks/list/Observing');
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
                onChange={(activeKey) => navigate(`/tasks/list/${activeKey}`)}
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
              <TasksControls
                selectedTasks={selectedTasks}
                setSelectedTasks={setSelectedTasks}
                tasks={tasks}
              />
            </ContentWrapper>
          </FiltrationWrapper>
          <ContentWrapper>
            {isPermissionToShowSummary && (
              <TasksSummary
                tasksSummaryData={tasksSummaryData}
                isLoading={isLoading}
              />
            )}
            <WithLoader isLoading={isLoading}>
              {tasks?.length ? (
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
                disabled={Boolean(selectedTasks.length)}
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
