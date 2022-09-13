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

  const addComment = useEvent(inputs.addComment);
  const setComment = useEvent(inputs.setComment);
  const handleDeleteDocument = useEvent(inputs.deleteDocument);

  const device = task && task.device;
  const nodeId = device?.nodeId;

  const relatedPipeNode = nodeId ? pipeNode : null;

  return (
    <>
      {nodeId && <RelatedNodeIdGate nodeId={nodeId} />}
      <ReadingsHistoryModal readonly />
      <TaskIdGate taskId={Number(taskId)} />

      {isLoading && <Skeleton active />}

      {!isLoading && task && (
        <TaskProfile
          handleDeleteDocument={handleDeleteDocument}
          task={task}
          isPerpetrator={isPerpetrator}
          handleAddComment={() => addComment()}
          handleSetComment={setComment}
          commentText={commentText}
          relatedPipeNode={relatedPipeNode}
        />
      )}
    </>
  );
};
