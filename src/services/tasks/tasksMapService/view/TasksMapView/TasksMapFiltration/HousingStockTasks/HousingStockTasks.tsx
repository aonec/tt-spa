import React, { FC } from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';
import { CalculatorIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
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
import { EActResourceType } from 'myApi';
import { HousingStockTasksProps } from './HousingStockTasks.types';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { TaskInfoPanel } from './TaskInfoPanel';

export const HousingStockTasks: FC<HousingStockTasksProps> = ({
  selectedHousingStock,
  clearSelectedHousingStock,
  task,
  handleClickTask,
  isLoadingTask,
  clearTask,
}) => {
  const address = selectedHousingStock?.housingStock?.address?.mainAddress;

  const tasks = selectedHousingStock?.tasks || [];

  const sortedTasks = _.sortBy(tasks, (task) => _.sortBy(task.resourceTypes));

  const tasksListView = sortedTasks.map((task, index) => {
    const resource =
      (task.resourceTypes?.length || 1) > 1
        ? EActResourceType.All
        : task.resourceTypes?.[0];

    const isDrawTooltip = (task.typeString?.length || 0) > 26;

    return (
      <TaskItem key={task.id} onClick={() => handleClickTask(task.id)}>
        <TaskInfo>
          {resource ? (
            <ResourceIconLookup resource={resource} />
          ) : (
            <CalculatorIcon />
          )}
          <div>
            {!isDrawTooltip && <TaskTitle>{task.typeString}</TaskTitle>}
            {isDrawTooltip && (
              <Tooltip title={task.typeString}>
                <TaskTitle>{task.typeString}</TaskTitle>
              </Tooltip>
            )}
            <ApartmentInfo>Кв. {index + 1}</ApartmentInfo>
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

  return (
    <HousingStockWrapper>
      <Header>
        <ChevronIconSC onClick={task ? clearTask : clearSelectedHousingStock} />
        <Address
          to={`/objects/profile/${selectedHousingStock?.housingStock?.id}`}
        >
          {addressString}
          <City>{`${address?.city}`}</City>
        </Address>
      </Header>
      <LoaderWrapper isLoading={isLoadingTask}>
        <WithLoader isLoading={isLoadingTask}>
          {task ? <TaskInfoPanel task={task} /> : tasksListView}
        </WithLoader>
      </LoaderWrapper>
    </HousingStockWrapper>
  );
};
