import { pushStagePayloadValidationsArray } from './taskProfileService.constants';
import { message } from 'antd';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  StagePushRequest,
  TaskCommentResponse,
  TaskResponse,
  PipeNodeResponse,
  DocumentResponse,
} from 'api/types';
import { currentUserService } from 'services/currentUserService';
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

const domain = createDomain('taskProfileService');

const getTasksFx = domain.createEffect<number, TaskResponse>(fetchTask);

const getNodeFx = domain.createEffect<number, PipeNodeResponse>(fetchNode);

const revertStageFx = domain.createEffect<
  number,
  TaskResponse,
  EffectFailDataAxiosError
>(revertStage);

const pushStageFx = domain.createEffect<
  PushStageRequestPayload,
  TaskResponse,
  EffectFailDataAxiosError
>(postPushStage);

const deleteDocument = domain.createEvent();
const deleteDocumentFx = domain.createEffect<number, void>(fetchDeleteDocument);

const handleChangePushStagePayload = domain.createEvent<
  StagePushRequest | ((payload: StagePushRequest) => StagePushRequest)
>();

const handleRevertStage = domain.createEvent();

const handlePushStage = domain.createEvent();

const refetchTask = domain.createEvent();

const setComment = domain.createEvent<string>();
const clearComment = domain.createEvent();

const TaskIdGate = createGate<{ taskId: number }>();
const RelatedNodeIdGate = createGate<{ nodeId: number }>();

const $commentText = domain
  .createStore<string>('')
  .on(setComment, (_, newComment) => newComment)
  .reset(clearComment);

const $pushStageRequestPayload = domain
  .createStore<StagePushRequest>({})
  .on(handleChangePushStagePayload, (prev, dispatch) => {
    if (typeof dispatch === 'function') {
      return { ...prev, ...dispatch(prev) };
    }

    return { ...prev, ...dispatch };
  })
  .reset(getTasksFx.doneData, pushStageFx.failData, revertStageFx.failData);

const $pipeNode = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(getNodeFx.doneData, (_, pipeNode) => pipeNode);

const addComment = domain.createEvent();
const addCommentFx = domain.createEffect<
  AddCommentRequest,
  TaskCommentResponse
>(fetchAddComment);

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

const openDeleteDocumentModal = domain.createEvent<number>();
const closeDeleteDocumentModal = domain.createEvent();
const $deletedDocumentId = domain
  .createStore<number>(0)
  .on(openDeleteDocumentModal, (_, id) => id)
  .reset(closeDeleteDocumentModal);

const $deleteDocumentModalIsOpen = $deletedDocumentId.map((id) => Boolean(id));

const $documents = domain
  .createStore<DocumentResponse[]>([])
  .on(getTasksFx.doneData, (_, task) => task.documents || [])
  .on(deleteDocumentFx.done, (documents, { params: documentId }) =>
    documents.filter((document) => document.id !== documentId),
  );

const $isLoading = getTasksFx.pending;

forward({
  from: TaskIdGate.open.map(({ taskId }) => taskId),
  to: getTasksFx,
});

sample({
  source: TaskIdGate.state.map(({ taskId }) => taskId),
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

guard({
  source: combine($pushStageRequestPayload, $task, (data, task) => ({
    data,
    taskId: task?.id,
  })),
  clock: guard({
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

guard({
  source: $task.map((task) => task?.id),
  clock: handleRevertStage,
  filter: (id): id is number => Boolean(id),
  target: revertStageFx,
});

const $isPushStageLoading = pushStageFx.pending;

pushStageFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

forward({
  from: [pushStageFx.doneData, revertStageFx.doneData],
  to: refetchTask,
});

const $isRevertStageLoading = revertStageFx.pending;

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
  },
  gates: { TaskIdGate, RelatedNodeIdGate },
};
