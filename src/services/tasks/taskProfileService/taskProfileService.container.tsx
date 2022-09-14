import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { taskProfileService } from '.';
import { TaskProfile } from './view/TaskProfile';

const { gates, outputs } = taskProfileService;
const { TaskIdGate } = gates;

export const TaskProfileContainer = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const task = useStore(outputs.$task);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      <TaskIdGate taskId={Number(taskId)} />
      {task && <TaskProfile task={task} isLoading={isLoading} />}
    </>
  );
};
