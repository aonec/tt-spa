import React, { FC, useMemo } from 'react';
import {
  createTimeline,
  createTimer,
} from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { TaskActionsPanel } from './TaskActionsPanel';
import { TaskBaseInfo } from './TaskBaseInfo';
import { TaskComments } from './TaskComments';
import { TaskConfirmationPanel } from './TaskConfirmationPanel';
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
  isLoadingTask,
  handleAddComment,
  isPerpetrator,
  handleSetComment,
  commentText,
  handleDeleteDocument,
  relatedPipeNode,
  isViewerExecutor,
  documents,
  isPushStageLoading,
  pushStage,
  handleRevertStage,
  isRevertStageLoading,
  handleChangePushStagePayload,
  closeDeleteDocumentModal,
  deleteDocumentModalIsOpen,
  openDeleteDocumentModal,
}) => {
  const {
    individualDevices,
    device,
    name: taskName,
    stages,
    apartment,
    housingStockId,
    pipeNode,
    comments,
    canBeReverted,
  } = task;

  const apartmemtId = apartment?.id || 0;

  const timeline = createTimeline(task);
  const timer = createTimer(task);

  const name = useMemo(() => {
    if (!task.closingStatus) {
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
          <Dialog
            isOpen={deleteDocumentModalIsOpen}
            onCancel={closeDeleteDocumentModal}
            onSubmit={() => handleDeleteDocument()}
            type="danger"
            title="Вы уверены, что хотите удалить документ?"
          />
          <TaskProfileHeader
            name={name}
            devices={individualDevices || []}
            timeline={timeline}
            nodeDevice={device}
            timer={timer}
            taskName={taskName || ''}
            pipeNode={pipeNode}
          />
          {task.type && isViewerExecutor && (
            <TaskActionsPanel
              handlePushStage={pushStage}
              isLoading={isPushStageLoading || isLoadingTask}
              taskType={task.type}
              actions={taskActions}
              handleChangePushStagePayload={handleChangePushStagePayload}
            />
          )}
          <TaskWrapper>
            <TaskInfoWrapper>
              {task.taskConfirmation && (
                <TaskConfirmationPanel
                  taskConfirmation={task.taskConfirmation}
                  taskType={task.type}
                />
              )}
              <TaskDocumentsList
                documents={documents || []}
                openDeleteDocumentModal={openDeleteDocumentModal}
              />
              <TaskComments
                comments={comments || []}
                handleAddComment={handleAddComment}
                isPerpetrator={isPerpetrator}
                handleSetComment={handleSetComment}
                commentText={commentText}
              />
              <TaskBaseInfo task={task} />
              {individualDevices && individualDevices.length !== 0 && (
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
            </TaskInfoWrapper>
            <TaskStages
              handleRevertStage={handleRevertStage}
              stages={stages || []}
              isRevertStageLoading={isRevertStageLoading}
              isStageCanBeReverted={canBeReverted}
            />
          </TaskWrapper>
        </>
      )}
    </Wrapper>
  );
};
