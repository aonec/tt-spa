import React, { FC, useMemo } from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';
import {
  Address,
  ApartmentInfo,
  ChevronIconSC,
  ChevronRightIcon,
  City,
  Header,
  HousingStockWrapper,
  LoaderWrapper,
  TaskInfo,
  TaskItem,
  TaskTitle,
} from './HousingStockTasks.styled';
import { HousingStockTasksProps } from './HousingStockTasks.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { TaskInfoPanel } from './TaskInfoPanel';
import { getTaskIconByTaskType } from './HousingStockTasks.utils';
import { EHouseCategory } from 'myApi';

export const HousingStockTasks: FC<HousingStockTasksProps> = ({
  selectedHousingStock,
  clearSelectedHousingStock,
  task,
  handleClickTask,
  isLoadingTask,
  clearTask,
}) => {
  const address = selectedHousingStock?.building?.address?.mainAddress;

  const tasks = selectedHousingStock?.tasks || [];

  const sortedTasks = _.sortBy(tasks, (task) => _.sortBy(task.resourceTypes));

  const tasksListView = sortedTasks.map((task) => {
    const isDrawTooltip = (task.typeString?.length || 0) > 26;

    const TaskIcon = getTaskIconByTaskType(task);

    return (
      <TaskItem key={task.id} onClick={() => handleClickTask(task.id)}>
        <TaskInfo>
          {TaskIcon && <TaskIcon />}
          <div>
            {!isDrawTooltip && <TaskTitle>{task.typeString}</TaskTitle>}
            {isDrawTooltip && (
              <Tooltip title={task.typeString}>
                <TaskTitle>{task.typeString}</TaskTitle>
              </Tooltip>
            )}
            {task.apartmentNumber && (
              <ApartmentInfo>Кв. {task.apartmentNumber}</ApartmentInfo>
            )}
          </div>
        </TaskInfo>
        <ChevronRightIcon className="chevron-icon-right" />
      </TaskItem>
    );
  });

  const apartmentNumber = task?.apartment?.apartmentNumber;

  const addressString = `${address?.street}, ${address?.number}${
    address?.corpus || ''
  }${apartmentNumber ? `, кв. ${apartmentNumber}` : ''}`;

  const buildingProfilePath = useMemo(() => {
    if (
      selectedHousingStock?.building?.houseCategory === EHouseCategory.Living
    ) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [selectedHousingStock]);

  return (
    <HousingStockWrapper>
      <Header>
        <ChevronIconSC onClick={task ? clearTask : clearSelectedHousingStock} />
        {selectedHousingStock?.building && (
          <Address
            to={`/buildings/${buildingProfilePath}/${selectedHousingStock?.building?.id}`}
          >
            {addressString}
            <City>{`${address?.city}`}</City>
          </Address>
        )}
      </Header>
      <LoaderWrapper isLoading={isLoadingTask}>
        <WithLoader isLoading={isLoadingTask}>
          {task ? <TaskInfoPanel task={task} /> : tasksListView}
        </WithLoader>
      </LoaderWrapper>
    </HousingStockWrapper>
  );
};
