import _ from 'lodash';
import { EActResourceType, EManagingFirmTaskType } from 'api/myApi';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CalculatorIcon, NumberIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { TimeLine } from 'ui-kit/shared_components/TimeLine';
import { Timer } from 'ui-kit/shared_components/Timer';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { PipeRuptureConclusion } from './PipeRuptureConclusion';
import {
  CalendarIconSC,
  DeviceInfoWrapper,
  InfoBlockWrapper,
  InfoWrapper,
  MapIconSC,
  NameRowWrapper,
  PipeNodeNameWrapper,
  PipeNodeWrapper,
  SerialNumberWrapper,
  TaskItemWrapper,
  TaskNameWrapper,
  TextWrapper,
  TimerRowWrapper,
  UserIconSC,
  Wrapper,
} from './TasksListItem.styled';
import { TasksListItemProps } from './TasksListItem.types';

export const TasksListItem: FC<TasksListItemProps> = ({ task }) => {
  const {
    currentStage,
    name,
    timeline,
    timer,
    showExecutor,
    perpetrator,
    devices,
    id,
    formatedCreationTime,
    address,
    pipeNode,
    closingStatus,
    taskConfirmation,
    type,
  } = task;
  const taskName = currentStage ? currentStage.name : name;

  const device = devices ? devices[0] : null;

  const DeviceIcon = useMemo(() => {
    if (!devices) {
      return null;
    }

    const device = devices[0];

    const allDevicesResource = devices.map((device) => device?.resource);
    const isUniq = _.uniq(allDevicesResource).length === 1;
    const iconType = isUniq ? device?.resource : EActResourceType.All;

    if (iconType) {
      return <ResourceIconLookup resource={iconType} />;
    }
    return <CalculatorIcon />;
  }, [devices]);

  const isPipeRuptureArchived = useMemo(
    () =>
      closingStatus &&
      taskConfirmation &&
      type === EManagingFirmTaskType.PipeRupture,
    [closingStatus, taskConfirmation, type],
  );

  const pipeNodeInfo = useMemo(() => {
    if (!pipeNode) return null;

    return (
      <PipeNodeWrapper>
        <ResourceIconLookup resource={pipeNode.resource} />
        <PipeNodeNameWrapper>Узел {pipeNode.number}</PipeNodeNameWrapper>
      </PipeNodeWrapper>
    );
  }, [pipeNode]);

  return (
    <Wrapper>
      <Link to={`/tasks/profile/${id}`}>
        <TaskItemWrapper>
          <NameRowWrapper>
            <TaskNameWrapper className="task-item-title">
              {taskName}
            </TaskNameWrapper>
            <span>{currentStage && name}</span>
          </NameRowWrapper>
          {timeline && <TimeLine timeline={timeline} />}
          <TimerRowWrapper>
            <Timer timer={timer} />
            {isPipeRuptureArchived && (
              <PipeRuptureConclusion taskConfirmation={taskConfirmation} />
            )}
            {showExecutor && (
              <>
                <UserIconSC />
                <TextWrapper>{perpetrator?.name}</TextWrapper>
              </>
            )}
          </TimerRowWrapper>
          <InfoWrapper>
            <InfoBlockWrapper>
              {device && (
                <DeviceInfoWrapper>
                  {DeviceIcon}
                  <SerialNumberWrapper>
                    {device.serialNumber}
                  </SerialNumberWrapper>
                  <TextWrapper>{device.model}</TextWrapper>
                </DeviceInfoWrapper>
              )}
              {pipeNodeInfo}

              <MapIconSC />
              <TextWrapper>
                {getApartmentFromFullAddress(address, true)}
              </TextWrapper>
            </InfoBlockWrapper>
            <div>
              <NumberIcon />
              <TextWrapper>{id}</TextWrapper>
              <CalendarIconSC />
              <TextWrapper>{formatedCreationTime}</TextWrapper>
            </div>
          </InfoWrapper>
        </TaskItemWrapper>
      </Link>
    </Wrapper>
  );
};
