import { ReadingsHistoryContainer } from 'services/meters/readingsHistoryService/readingsHistoryService.container';
import { Skeleton } from 'antd';
import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { taskProfileService } from '.';
import { TaskProfile } from './view/TaskProfile';
import { EManagingFirmTaskType } from 'api/types';
import { applicationInfoService } from './applicationInfoService';

const { gates, outputs, inputs } = taskProfileService;
const { TaskIdGate, RelatedNodeIdGate } = gates;

export const TaskProfileContainer = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const {
    task,
    pipeNode,
    isLoading,
    isPerpetrator,
    commentText,
    currentUser,
    documents,
    isPushStageLoading,
    isRevertStageLoading,
    deleteDocumentModalIsOpen,
    addComment,
    setComment,
    handleDeleteDocument,
    pushStage,
    handleRevertStage,
    handleChangePushStagePayload,
    openDeleteDocumentModal,
    closeDeleteDocumentModal,
    pushStageRequestPayload,
    handleFetchApplicationInfo,
  } = useUnit({
    task: outputs.$task,
    pipeNode: outputs.$pipeNode,
    isLoading: outputs.$isLoading,
    isPerpetrator: outputs.$isPerpetrator,
    commentText: outputs.$commentText,
    currentUser: outputs.$currentUser,
    documents: outputs.$documents,
    isPushStageLoading: outputs.$isPushStageLoading,
    isRevertStageLoading: outputs.$isRevertStageLoading,
    deleteDocumentModalIsOpen: outputs.$deleteDocumentModalIsOpen,
    addComment: inputs.addComment,
    setComment: inputs.setComment,
    handleDeleteDocument: inputs.deleteDocument,
    pushStage: inputs.handlePushStage,
    handleRevertStage: inputs.handleRevertStage,
    handleChangePushStagePayload: inputs.handleChangePushStagePayload,
    openDeleteDocumentModal: inputs.openDeleteDocumentModal,
    closeDeleteDocumentModal: inputs.closeDeleteDocumentModal,
    pushStageRequestPayload: outputs.$pushStageRequestPayload,
    handleFetchApplicationInfo:
      applicationInfoService.inputs.handleFetchApplicationInfo,
  });

  const device = task && task.device;
  const nodeId = device?.nodeId;

  const relatedPipeNode = nodeId && !task?.pipeNode ? pipeNode : null;

  const isViewerExecutor =
    Boolean(currentUser?.id) && currentUser?.id === task?.perpetrator?.id;

  const isApplication =
    task?.type === EManagingFirmTaskType.PlannedApplication ||
    task?.type === EManagingFirmTaskType.CurrentApplication ||
    task?.type === EManagingFirmTaskType.EmergencyApplication;

  useEffect(() => {
    if (isApplication) {
      handleFetchApplicationInfo(Number(taskId));
    }
  }, [isApplication, handleFetchApplicationInfo, taskId]);

  return (
    <>
      {nodeId && <RelatedNodeIdGate nodeId={nodeId} />}
      <ReadingsHistoryContainer readonly />
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
          pushStageRequestPayload={pushStageRequestPayload}
          isApplication={isApplication}
        />
      )}
    </>
  );
};
