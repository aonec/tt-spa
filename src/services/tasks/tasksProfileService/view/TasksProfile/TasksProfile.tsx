import React, { FC, useEffect, useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '01/shared/ui/PageHeader';
import { SearchTasks } from '../SearchTasks';
import { TasksList } from '../TasksList';
import { PaginationSC, TabsSC, Wrapper } from './TasksProfile.styled';
import { ObjectAddress, TasksProfileProps } from './TasksProfile.types';
import { TaskGroupingFilter } from 'myApi';
import { getAddressObject } from '../../tasksProfileService.utils';
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
  streets,
  cities,
  isSpectator,
}) => {
  const [address, setAddress] = useState<ObjectAddress>({
    ApartmentNumber: '',
    City: '',
    Corpus: '',
    HousingStockNumber: '',
    Street: '',
  });

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

  useEffect(() => {
    if (initialValues.ApartmentId || initialValues.HousingStockId) {
      const relatedTaask = pagedTasks?.items?.[0];
      const relatedTaskAddress = relatedTaask?.address || null;
      let objectAddress = getAddressObject(relatedTaskAddress);
      
      if (initialValues.HousingStockId) {
        objectAddress = { ...objectAddress, ApartmentNumber: '' };
      }
      setAddress(objectAddress);
    }
  }, [pagedTasks, initialValues]);

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
        address={address}
        taskTypes={taskTypes}
        currentFilter={initialValues}
        isExtendedSearchOpen={isExtendedSearchOpen}
        closeExtendedSearch={closeExtendedSearch}
        openExtendedSearch={openExtendedSearch}
        clearFilters={clearFilters}
        changeFiltersByGroupType={changeFiltersByGroupType}
        housingManagments={housingManagments}
        perpetrators={perpetrators}
        streets={streets}
        cities={cities}
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
