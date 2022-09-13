import { Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import {
  createTimeline,
  createTimer,
} from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { TaskBaseInfo } from './TaskBaseInfo';
import { TaskComments } from './TaskComments';
import { TaskDeviceInfo } from './TaskDeviceInfo';
import { TaskDocumentsList } from './TaskDocumentsList';
import { TaskIndividualDevicesList } from './TaskIndividualDevicesList';
import { TaskPipeNodeInfo } from './TaskPipeNodeInfo';
import { TaskWrapper } from './TaskProfile.styled';
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
    documents,
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

  return (
    <div>
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
          <TaskWrapper>
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
            <div>
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
            </div>
            <TaskStages stages={stages || []} />
          </TaskWrapper>
        </>
      )}
    </div>
  );
};
