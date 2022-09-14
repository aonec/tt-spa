import { Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import {
  createTimeline,
  createTimer,
} from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { TaskActionsPanel } from './TaskActionsPanel';
import { TaskBaseInfo } from './TaskBaseInfo';
import { TaskComments } from './TaskComments';
import { TaskDeviceInfo } from './TaskDeviceInfo';
import { TaskIndividualDevicesList } from './TaskIndividualDevicesList';
import { TaskPipeNodeInfo } from './TaskPipeNodeInfo';
import { TaskInfoWrapper, TaskWrapper, Wrapper } from './TaskProfile.styled';
import { TaskProfileProps } from './TaskProfile.types';
import { TaskProfileHeader } from './TaskProfileHeader';
import { TaskStages } from './TaskStages';

export const TaskProfile: FC<TaskProfileProps> = ({
  task,
  isLoading,
  handleAddComment,
  isPerpetrator,
  handleSetComment,
  commentText,
}) => {
  const {
    closingStatus,
    individualDevices,
    device,
    name: taskName,
    stages,
    apartment,
    housingStockId,
    pipeNode,
    comments,
  } = task;

  const apartmemtId = apartment?.id || 0;

  const timeline = createTimeline(task);
  const timer = createTimer(task);

  const name = useMemo(() => {
    if (!closingStatus) {
      return task.currentStage?.name;
    }
    return task.name;
  }, [task]);

  const taskActions = task.currentStage?.actions || [];

  return (
    <Wrapper>
      <GoBack />
      {isLoading && <Skeleton active />}
      {!isLoading && name && (
        <>
          <TaskProfileHeader
            name={name}
            devices={individualDevices || []}
            timeline={timeline}
            nodeDevice={device}
            timer={timer}
            taskName={taskName || ''}
          />
          <TaskActionsPanel handlePushStage={() => {}} actions={taskActions} />
          <TaskWrapper>
            <TaskInfoWrapper>
              <TaskComments
                comments={comments || []}
                handleAddComment={handleAddComment}
                isPerpetrator={isPerpetrator}
                handleSetComment={handleSetComment}
                commentText={commentText}
              />
              <TaskBaseInfo task={task} />
              {individualDevices && (
                <TaskIndividualDevicesList
                  devices={individualDevices}
                  apartmentId={apartmemtId}
                  housingStockId={housingStockId}
                />
              )}
              {device && <TaskDeviceInfo device={device} />}
              {pipeNode && <TaskPipeNodeInfo pipeNode={pipeNode} />}
            </TaskInfoWrapper>
            <TaskStages stages={stages || []} />
          </TaskWrapper>
        </>
      )}
    </Wrapper>
  );
};
