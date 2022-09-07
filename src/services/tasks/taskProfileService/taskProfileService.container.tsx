import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { taskProfileService } from '.';
import { TaskProfile } from './view/TaskProfile';

const { gates, outputs } = taskProfileService;
const { TaskIdGate, RelatedNodeIdGate } = gates;

export const TaskProfileContainer = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const task = useStore(outputs.$task);
  const pipeNode = useStore(outputs.$pipeNode);
  const isLoading = useStore(outputs.$isLoading);

  const device = task && task.device;
  const nodeId = device?.nodeId;

  const relatedPipeNode = nodeId ? pipeNode : null;
  return (
    <>
      {nodeId && <RelatedNodeIdGate nodeId={nodeId} />}
      <ReadingsHistoryModal readonly />
      <TaskIdGate taskId={Number(taskId)} />
      {task && (
        <TaskProfile
          task={task}
          isLoading={isLoading}
          relatedPipeNode={relatedPipeNode}
        />
      )}
    </>
  );
};
