import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { taskProfileService } from '.';
import { TaskProfile } from './view/TaskProfile';

const { gates, outputs, inputs } = taskProfileService;
const { TaskIdGate, RelatedNodeIdGate } = gates;

export const TaskProfileContainer = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const task = useStore(outputs.$task);
  const pipeNode = useStore(outputs.$pipeNode);
  const isLoading = useStore(outputs.$isLoading);
  const isPerpetrator = useStore(outputs.$isPerpetrator);
  const commentText = useStore(outputs.$commentText);
  const currentUser = useStore(outputs.$currentUser);
  const documents = useStore(outputs.$documents);
  const isPushStageLoading = useStore(outputs.$isPushStageLoading);
  const isRevertStageLoading = useStore(outputs.$isRevertStageLoading);
  const deleteDocumentModalIsOpen = useStore(
    outputs.$deleteDocumentModalIsOpen
  );

  const addComment = useEvent(inputs.addComment);
  const setComment = useEvent(inputs.setComment);
  const handleDeleteDocument = useEvent(inputs.deleteDocument);
  const pushStage = useEvent(inputs.handlePushStage);
  const handleRevertStage = useEvent(inputs.handleRevertStage);
  const handleChangePushStagePayload = useEvent(
    inputs.handleChangePushStagePayload
  );
  const openDeleteDocumentModal = useEvent(inputs.openDeleteDocumentModal);
  const closeDeleteDocumentModal = useEvent(inputs.closeDeleteDocumentModal);

  const device = task && task.device;
  const nodeId = device?.nodeId;

  const relatedPipeNode = nodeId ? pipeNode : null;

  const isViewerExecutor =
    Boolean(currentUser?.id) && currentUser?.id === task?.perpetrator?.id;

  return (
    <>
      {nodeId && <RelatedNodeIdGate nodeId={nodeId} />}
      <ReadingsHistoryModal readonly />
      <TaskIdGate taskId={Number(taskId)} />

      {isLoading && !task && <Skeleton active />}

      {task && (
        <TaskProfile
          handleDeleteDocument={() => handleDeleteDocument()}
          task={task}
          isLoadingTask={isLoading}
          isPerpetrator={isPerpetrator}
          handleAddComment={() => addComment()}
          handleSetComment={setComment}
          commentText={commentText}
          relatedPipeNode={relatedPipeNode}
          isViewerExecutor={isViewerExecutor}
          documents={documents}
          pushStage={() => pushStage()}
          isPushStageLoading={isPushStageLoading}
          handleRevertStage={() => handleRevertStage()}
          isRevertStageLoading={isRevertStageLoading}
          handleChangePushStagePayload={handleChangePushStagePayload}
          deleteDocumentModalIsOpen={deleteDocumentModalIsOpen}
          openDeleteDocumentModal={openDeleteDocumentModal}
          closeDeleteDocumentModal={() => closeDeleteDocumentModal()}
        />
      )}
    </>
  );
};
