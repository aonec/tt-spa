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
import { TaskDocumentsList } from './TaskDocumentsList';
import { TaskIndividualDevicesList } from './TaskIndividualDevicesList';
import { TaskPipeNodeInfo } from './TaskPipeNodeInfo';
import { TaskInfoWrapper, TaskWrapper, Wrapper } from './TaskProfile.styled';
import { TaskProfileProps } from './TaskProfile.types';
import { TaskProfileHeader } from './TaskProfileHeader';
import { TaskStages } from './TaskStages';

export const TaskProfile: FC<TaskProfileProps> = ({
  task,
  handleAddComment,
  isPerpetrator,
  handleSetComment,
  commentText,
  handleDeleteDocument,
  relatedPipeNode,
  isViewerExecutor,
  documents,
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
      {name && (
        <>
          <TaskProfileHeader
            name={name}
            devices={individualDevices || []}
            timeline={timeline}
            nodeDevice={device}
            timer={timer}
            taskName={taskName || ''}
          />
          {task.type && isViewerExecutor && (
            <TaskActionsPanel
              handlePushStage={() => {}}
              taskType={task.type}
              actions={taskActions}
            />
          )}
          <TaskWrapper>
            <TaskInfoWrapper>
              <TaskDocumentsList
                documents={documents || []}
                handleDeleteDocument={handleDeleteDocument}
              />
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
              {relatedPipeNode && (
                <TaskPipeNodeInfo pipeNode={relatedPipeNode} />
              )}
              {pipeNode && <TaskPipeNodeInfo pipeNode={pipeNode} />}
            </TaskInfoWrapper>
            <TaskStages stages={stages || []} />
          </TaskWrapper>
        </>
      )}
    </Wrapper>
  );
};
