import { EActResourceType } from 'myApi';
import React, { FC } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  Address,
  ChevronIconSC,
  ChevronRightIcon,
  City,
  Header,
  HousingStockWrapper,
  TaskInfo,
  TaskItem,
  TaskTitle,
} from './HousingStockTasks.styled';
import { HousingStockTasksProps } from './HousingStockTasks.types';

export const HousingStockTasks: FC<HousingStockTasksProps> = ({
  selectedHousingStock,
}) => {
  const address = selectedHousingStock?.housingStock?.address?.mainAddress;

  return (
    <HousingStockWrapper>
      <Header>
        <ChevronIconSC />
        <Address>
          {`${address?.street}, ${address?.number}${address?.corpus || ''}`}
          <City>{`${address?.city}`}</City>
        </Address>
      </Header>
      {selectedHousingStock?.tasks?.map((task) => {
        const resource =
          (task.resourceTypes?.length || 1) > 1
            ? EActResourceType.All
            : task.resourceTypes?.[0];

        return (
          <TaskItem
            key={task.id}
            href={`/tasks/profile/${task.id}`}
            target="_blank"
          >
            <TaskInfo>
              {resource ? (
                <ResourceIconLookup resource={resource} />
              ) : (
                <CalculatorIcon />
              )}
              <TaskTitle>{task.type}</TaskTitle>
            </TaskInfo>
            <ChevronRightIcon className="chevron-icon-right" />
          </TaskItem>
        );
      })}
    </HousingStockWrapper>
  );
};
