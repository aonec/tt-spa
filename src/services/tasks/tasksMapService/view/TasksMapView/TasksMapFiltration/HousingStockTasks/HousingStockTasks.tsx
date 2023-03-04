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
import _ from 'lodash';
import { Tooltip } from 'antd';

export const HousingStockTasks: FC<HousingStockTasksProps> = ({
  selectedHousingStock,
  clearSelectedHousingStock,
}) => {
  const address = selectedHousingStock?.housingStock?.address?.mainAddress;

  const tasks = selectedHousingStock?.tasks || [];

  return (
    <HousingStockWrapper>
      <Header>
        <ChevronIconSC onClick={clearSelectedHousingStock} />
        <Address>
          {`${address?.street}, ${address?.number}${address?.corpus || ''}`}
          <City>{`${address?.city}`}</City>
        </Address>
      </Header>
      {_.sortBy(tasks, (task) => task.type)?.map((task) => {
        const resource =
          (task.resourceTypes?.length || 1) > 1
            ? EActResourceType.All
            : task.resourceTypes?.[0];

        const isDrawTooltip = (task.typeString?.length || 0) > 26;

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
              {!isDrawTooltip && <TaskTitle>{task.typeString}</TaskTitle>}
              {isDrawTooltip && (
                <Tooltip title={task.typeString}>
                  <TaskTitle>{task.typeString}</TaskTitle>
                </Tooltip>
              )}
            </TaskInfo>
            <ChevronRightIcon className="chevron-icon-right" />
          </TaskItem>
        );
      })}
    </HousingStockWrapper>
  );
};
