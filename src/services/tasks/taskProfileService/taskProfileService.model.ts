import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { TaskCommentResponse, TaskResponse } from 'myApi';
import { currentUserService } from 'services/currentUserService';
import { fetchAddComment, fetchTask } from './taskProfileService.api';
import { AddCommentRequest } from './taskProfileService.types';

const domain = createDomain('taskProfileService');

const setComment = domain.createEvent<string>();
const $commentText = domain
  .createStore<string>('')
  .on(setComment, (_, newComment) => newComment);

const addComment = domain.createEvent();
const addCommentFx = domain.createEffect<
  AddCommentRequest,
  TaskCommentResponse
>(fetchAddComment);

const getTasksFx = domain.createEffect<number, TaskResponse>(fetchTask);
const $task = domain
  .createStore<TaskResponse | null>(null)
  .on(getTasksFx.doneData, (_, task) => task)
  .on(addCommentFx.doneData, (task, newComment) => {
    if (!task) {
      return null;
    }
    const oldComments = task?.comments || [];

    return {
      ...task,
      comments: [...oldComments, newComment],
    };
  });

const $isPerpetrator = combine(
  $task,
  currentUserService.outputs.$currentUser,
  (task, user) => {
    const currentStage = task?.currentStage;
    const stagePerpetrator = currentStage?.perpetrator;
    if (!stagePerpetrator || !user) {
      return false;
    }
    const isPerpetrator = stagePerpetrator.id === user.id;
    return isPerpetrator;
  }
);

const $isLoading = getTasksFx.pending;

const TaskIdGate = createGate<{ taskId: number }>();

forward({
  from: TaskIdGate.open.map(({ taskId }) => taskId),
  to: getTasksFx,
});

sample({
  source: combine(TaskIdGate.state, $commentText, ({ taskId }, comment) => ({
    taskId,
    comment,
  })),
  clock: addComment,
  target: addCommentFx,
});

addCommentFx.doneData.watch(() => setComment(''));

export const taskProfileService = {
  inputs: {
    addComment,
    setComment,
  },
  outputs: {
    $task,
    $isLoading,
    $isPerpetrator,
    $commentText,
  },
  gates: { TaskIdGate },
};
