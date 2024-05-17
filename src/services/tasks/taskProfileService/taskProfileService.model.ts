import { createEffect, createEvent, createStore } from 'effector';
import { pushStagePayloadValidationsArray } from './taskProfileService.constants';
import { message } from 'antd';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  StagePushRequest,
  TaskCommentResponse,
  TaskResponse,
  PipeNodeResponse,
  DocumentResponse,
} from 'api/types';
import { currentUserService } from 'services/currentUser/currentUserService';
import { EffectFailDataAxiosError } from 'types';
import {
  fetchAddComment,
  fetchDeleteDocument,
  fetchNode,
  fetchTask,
  postPushStage,
  revertStage,
} from './taskProfileService.api';
import {
  AddCommentRequest,
  PushStageRequestPayload,
} from './taskProfileService.types';

const getTasksFx = createEffect<number, TaskResponse>(fetchTask);

const getNodeFx = createEffect<number, PipeNodeResponse>(fetchNode);

const revertStageFx = createEffect<
  number,
  TaskResponse,
  EffectFailDataAxiosError
>(revertStage);

const pushStageFx = createEffect<
  PushStageRequestPayload,
  TaskResponse,
  EffectFailDataAxiosError
>(postPushStage);

const deleteDocument = createEvent();
const deleteDocumentFx = createEffect<number, void>(fetchDeleteDocument);

const handleChangePushStagePayload = createEvent<
  StagePushRequest | ((payload: StagePushRequest) => StagePushRequest)
>();

const handleRevertStage = createEvent();

const handlePushStage = createEvent();

const refetchTask = createEvent();

const setComment = createEvent<string>();
const clearComment = createEvent();

const TaskIdGate = createGate<{ taskId: number }>();
const RelatedNodeIdGate = createGate<{ nodeId: number }>();

const $commentText = createStore<string>('')
  .on(setComment, (_, newComment) => newComment)
  .reset(clearComment);

const $pushStageRequestPayload = createStore<StagePushRequest>({})
  .on(handleChangePushStagePayload, (prev, dispatch) => {
    if (typeof dispatch === 'function') {
      return { ...prev, ...dispatch(prev) };
    }

    return { ...prev, ...dispatch };
  })
  .reset(getTasksFx.doneData);

const $pipeNode = createStore<PipeNodeResponse | null>(null).on(
  getNodeFx.doneData,
  (_, pipeNode) => pipeNode,
);

const addComment = createEvent();
const addCommentFx = createEffect<
  AddCommentRequest,
  TaskCommentResponse,
  EffectFailDataAxiosError
>(fetchAddComment);

const $task = createStore<TaskResponse | null>(null)
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
  })
  .reset(TaskIdGate.close);

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
  },
);

const openDeleteDocumentModal = createEvent<number>();
const closeDeleteDocumentModal = createEvent();
const $deletedDocumentId = createStore<number>(0)
  .on(openDeleteDocumentModal, (_, id) => id)
  .reset(closeDeleteDocumentModal);

const $deleteDocumentModalIsOpen = $deletedDocumentId.map((id) => Boolean(id));

const $documents = createStore<DocumentResponse[]>([])
  .on(getTasksFx.doneData, (_, task) => task.documents || [])
  .on(deleteDocumentFx.done, (documents, { params: documentId }) =>
    documents.filter((document) => document.id !== documentId),
  );

const $isLoading = getTasksFx.pending;

const $isTaskProfileOpen = TaskIdGate.state.map((data) => Boolean(data.taskId));

const $taskGateId = TaskIdGate.state.map(({ taskId }) => taskId || null);

sample({
  source: $taskGateId,
  filter: Boolean,
  clock: TaskIdGate.open,
  target: getTasksFx,
});

sample({
  source: $taskGateId,
  filter: Boolean,
  clock: refetchTask,
  target: getTasksFx,
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
  source: sample({
    source: $deletedDocumentId,
    filter: Boolean,
  }),
  clock: deleteDocument,
  target: deleteDocumentFx,
});

sample({
  clock: deleteDocumentFx.doneData,
  target: closeDeleteDocumentModal,
});

const $nodeId = RelatedNodeIdGate.state.map(({ nodeId }) => nodeId || null);

sample({
  clock: $nodeId,
  filter: Boolean,
  target: getNodeFx,
});

sample({
  clock: addCommentFx.doneData,
  target: clearComment,
});

sample({
  source: combine($pushStageRequestPayload, $task, (data, task) => ({
    data,
    taskId: task?.id,
  })),
  clock: sample({
    source: combine($task, $pushStageRequestPayload),
    clock: handlePushStage,
    filter: ([task, payload]) => {
      const taskType = task?.type;
      const validation =
        taskType &&
        pushStagePayloadValidationsArray.find((elem) => {
          const isTaskTypeIntersection = elem.taskType === taskType;

          return isTaskTypeIntersection;
        })?.schema;

      try {
        validation?.validateSync(payload);
      } catch (e) {
        message.error((e as { message: string }).message);

        return false;
      }

      return true;
    },
  }),
  filter: (payload): payload is PushStageRequestPayload =>
    Boolean(payload.taskId),
  target: pushStageFx,
});

const $taskId = $task.map((task) => task?.id || null);

sample({
  source: $taskId,
  clock: handleRevertStage,
  filter: Boolean,
  target: revertStageFx,
});

const $isPushStageLoading = pushStageFx.pending;

pushStageFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

sample({
  clock: [pushStageFx.doneData, revertStageFx.doneData],
  target: refetchTask,
});

const $isRevertStageLoading = revertStageFx.pending;

addCommentFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const taskProfileService = {
  inputs: {
    addComment,
    setComment,
    handlePushStage,
    deleteDocument,
    handleRevertStage,
    handleChangePushStagePayload,
    openDeleteDocumentModal,
    closeDeleteDocumentModal,
  },
  outputs: {
    $task,
    $isLoading,
    $isPerpetrator,
    $commentText,
    $pipeNode,
    $currentUser: currentUserService.outputs.$currentUser,
    $documents,
    $isPushStageLoading,
    $isRevertStageLoading,
    $pushStageRequestPayload,
    $deleteDocumentModalIsOpen,
    $isTaskProfileOpen,
  },
  gates: { TaskIdGate, RelatedNodeIdGate },
};
