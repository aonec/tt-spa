import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { StagePushRequest, TaskCommentResponse, TaskResponse, PipeNodeResponse } from 'myApi';
import { currentUserService } from 'services/currentUserService';
import {
  fetchAddComment,
  fetchDeleteDocument,
  fetchNode,
  fetchTask,
} from './taskProfileService.api';
import { AddCommentRequest } from './taskProfileService.types';

const domain = createDomain('taskProfileService');

const handlePushStage = domain.createEvent<StagePushRequest>();

const setComment = domain.createEvent<string>();
const clearComment = domain.createEvent();
const $commentText = domain
  .createStore<string>('')
  .on(setComment, (_, newComment) => newComment)
  .reset(clearComment);

const getNodeFx = domain.createEffect<number, PipeNodeResponse>(fetchNode);

const $pipeNode = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(getNodeFx.doneData, (_, pipeNode) => pipeNode);

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

const openDeleteDocumentModal = domain.createEvent<number>();
const closeDeleteDocumentModal = domain.createEvent();
const $deletedDocumentId = domain
  .createStore<number>(0)
  .on(openDeleteDocumentModal, (_, id) => id)
  .reset(closeDeleteDocumentModal);

const $deleteDocumentModalIsOpen = $deletedDocumentId.map((id) => Boolean(id));

const deleteDocument = domain.createEvent();
const deleteDocumentFx = domain.createEffect<number, void>(fetchDeleteDocument);
const $documents = $task
  .map((task) => task?.documents || [])
  .on(deleteDocumentFx.done, (documents, { params: documentId }) =>
    documents.filter((document) => document.id !== documentId)
  );

const $isLoading = getTasksFx.pending;

const TaskIdGate = createGate<{ taskId: number }>();
const RelatedNodeIdGate = createGate<{ nodeId: number }>();

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

sample({
  source: guard({
    source: $deletedDocumentId,
    filter: Boolean,
  }),
  clock: deleteDocument,
  target: deleteDocumentFx,
});

forward({
  from: deleteDocumentFx.doneData,
  to: closeDeleteDocumentModal,
});

forward({
  from: RelatedNodeIdGate.state.map(({ nodeId }) => nodeId),
  to: getNodeFx,
});

forward({
  from: addCommentFx.doneData,
  to: clearComment,
});

export const taskProfileService = {
  inputs: {
    addComment,
    setComment,
    handlePushStage,
    deleteDocument,
    openDeleteDocumentModal,
    closeDeleteDocumentModal,
  },
  outputs: {
    $task,
    $isLoading,
    $isPerpetrator,
    $commentText,
    $pipeNode,
    $documents,
    $deleteDocumentModalIsOpen,
  },
  gates: { TaskIdGate, RelatedNodeIdGate },
};
