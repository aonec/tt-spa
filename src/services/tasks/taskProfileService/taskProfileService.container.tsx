import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { taskProfileService } from '.';
import { TaskProfile } from './view/TaskProfile';

const { gates, outputs, inputs } = taskProfileService;
const { TaskIdGate } = gates;

export const TaskProfileContainer = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const task = useStore(outputs.$task);
  const isLoading = useStore(outputs.$isLoading);
  const isPerpetrator = useStore(outputs.$isPerpetrator);
  const commentText = useStore(outputs.$commentText);

  const addComment = useEvent(inputs.addComment);
  const setComment = useEvent(inputs.setComment);

  return (
    <>
      <ReadingsHistoryModal readonly />
      <TaskIdGate taskId={Number(taskId)} />
      {task && (
        <TaskProfile
          task={task}
          isLoading={isLoading}
          isPerpetrator={isPerpetrator}
          handleAddComment={() => addComment()}
          handleSetComment={setComment}
          commentText={commentText}
        />
      )}
    </>
  );
};
