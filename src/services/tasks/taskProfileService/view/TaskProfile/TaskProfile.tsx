import React, { FC, useMemo } from 'react';
import {
  createTimeline,
  createTimer,
} from 'services/tasks/tasksProfileService/tasksProfileService.utils';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { GoBack } from 'ui-kit/shared/GoBack';
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
import { ApplicationInfoContainer } from '../../applicationInfoService';

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
  pushStageRequestPayload,
  isApplication,
}) => {
  const {
    individualDevices,
    device,
    name: taskName,
    stages,
    apartment,
    pipeNode,
    comments,
    canBeReverted,
  } = task;

  const apartmemtId = apartment?.id || 0;

  const timeline = useMemo(() => createTimeline(task), [task]);
  const timer = useMemo(() => createTimer(task), [task]);

  const name = useMemo(() => {
    if (!task.closingStatus) {
      return task.currentStage?.name;
    }
    return task.name;
  }, [task]);

  const taskActions = useMemo(
    () => [
      ...(task.currentStage?.actions || []),
      ...(task.currentStage?.additionalActions || []),
    ],
    [task.currentStage?.actions, task.currentStage?.additionalActions],
  );

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
            isApplication={isApplication}
          />
          {task.type && isViewerExecutor && (
            <TaskActionsPanel
              handlePushStage={pushStage}
              isLoading={isPushStageLoading || isLoadingTask}
              task={task}
              actions={taskActions}
              pushStageRequestPayload={pushStageRequestPayload}
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
              {!isApplication && (
                <>
                  <TaskBaseInfo task={task} />
                  {individualDevices && individualDevices.length !== 0 && (
                    <TaskIndividualDevicesList
                      devices={individualDevices}
                      apartmentId={apartmemtId}
                    />
                  )}
                  {device && <TaskDeviceInfo device={device} />}
                  {pipeNode && <TaskPipeNodeInfo pipeNode={pipeNode} />}
                  {relatedPipeNode && (
                    <TaskPipeNodeInfo pipeNode={relatedPipeNode} />
                  )}
                </>
              )}
              {isApplication && <ApplicationInfoContainer task={task} />}
            </TaskInfoWrapper>
            <TaskStages
              handleRevertStage={handleRevertStage}
              stages={stages || []}
              isRevertStageLoading={isRevertStageLoading}
              isStageCanBeReverted={canBeReverted}
              isEntryPoint={Boolean(task.currentStage?.isEntryPoint)}
              task={task}
            />
          </TaskWrapper>
        </>
      )}
    </Wrapper>
  );
};
