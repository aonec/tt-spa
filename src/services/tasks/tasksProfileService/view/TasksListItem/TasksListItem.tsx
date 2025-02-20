import { EManagingFirmTaskType } from 'api/types';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapIcon, NumberIcon, UserIcon } from 'ui-kit/icons';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { TimeLine } from 'ui-kit/shared/TimeLine';
import { Timer } from 'ui-kit/shared/Timer';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { PipeRuptureConclusion } from './PipeRuptureConclusion';
import {
  AddressWrapper,
  DeviceInfoWrapper,
  ExecutorWrapper,
  InfoBlockWrapper,
  InfoWrapper,
  NameRowWrapper,
  SerialNumberWrapper,
  TaskItemWrapper,
  TaskNameWrapper,
  TextWrapper,
  TimerRowWrapper,
  Wrapper,
} from './TasksListItem.styled';
import { TasksListItemProps } from './TasksListItem.types';
import { EmergencyPanel } from './EmergencyPanel';
import { Checkbox } from 'antd';

export const TasksListItem: FC<TasksListItemProps> = ({
  task,
  isSelected,
  toggleTaskCheckbox,
}) => {
  const {
    currentStage,
    name,
    timeline,
    timer,
    showExecutor,
    id,
    formatedCreationTime,
    address,
    closingStatus,
    taskConfirmation,
    type,
    creationReason,
    targetObject,
  } = task;
  const taskName = currentStage ? currentStage.name : name;

  const preparedTaskTitle = useMemo(() => {
    if (!creationReason) {
      return taskName;
    }

    return creationReason;
  }, [creationReason, taskName]);

  const DeviceIcon = useMemo(() => {
    if (!targetObject) return null;

    return <ResourceIconLookup resource={targetObject.targetObjectInfo} />;
  }, [targetObject]);

  const isPipeRuptureArchived = useMemo(
    () =>
      closingStatus &&
      taskConfirmation &&
      type === EManagingFirmTaskType.PipeRupture,
    [closingStatus, taskConfirmation, type],
  );

  const targetObjectInfo = useMemo(() => {
    if (!targetObject) return null;

    return (
      <DeviceInfoWrapper>
        {DeviceIcon}
        <SerialNumberWrapper>{targetObject.title}</SerialNumberWrapper>
        <TextWrapper>{targetObject.model}</TextWrapper>
      </DeviceInfoWrapper>
    );
  }, [DeviceIcon, targetObject]);

  const isEmergency = task.type === EManagingFirmTaskType.EmergencyApplication;

  return (
    <Wrapper data-test="task-item">
      <Link to={`/tasks/profile/${id}`}>
        <TaskItemWrapper isEmergency={isEmergency}>
          <NameRowWrapper>
            <TaskNameWrapper className="task-item-title">
              {toggleTaskCheckbox && (
                <Checkbox
                  checked={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTaskCheckbox();
                  }}
                />
              )}
              {preparedTaskTitle}
              {isEmergency && <EmergencyPanel />}
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
              <ExecutorWrapper>
                <UserIcon />
                <TextWrapper>{currentStage?.perpetrator?.name}</TextWrapper>
              </ExecutorWrapper>
            )}
          </TimerRowWrapper>
          <InfoWrapper>
            <InfoBlockWrapper>
              {targetObjectInfo}
              <MapIcon />
              <AddressWrapper>
                {getApartmentFromFullAddress(address, true)}
              </AddressWrapper>
            </InfoBlockWrapper>
            <TextWrapper>
              <NumberIcon />
              <div>{id}</div>
              <CalendarIcon />
              <div>{formatedCreationTime}</div>
            </TextWrapper>
          </InfoWrapper>
        </TaskItemWrapper>
      </Link>
    </Wrapper>
  );
};
