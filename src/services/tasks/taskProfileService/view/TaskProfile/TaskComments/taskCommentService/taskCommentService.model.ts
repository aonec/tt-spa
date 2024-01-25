import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { deleteTaskComment, updateTaskComment } from './taskCommentService.api';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { TaskCommentRequest, TaskCommentResponse } from 'api/types';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const handleDelete = createEvent<{
  taskId: number;
  commentId: number;
}>();

const handleUpdate = createEvent<{
  taskId: number;
  commentId: number;
  data: TaskCommentRequest;
}>();

const deleteTaskCommentFx = createEffect<
  {
    taskId: number;
    commentId: number;
  },
  void,
  EffectFailDataAxiosError
>(deleteTaskComment);

const updateTaskCommentFx = createEffect<
  {
    taskId: number;
    commentId: number;
    data: TaskCommentRequest;
  },
  TaskCommentResponse,
  EffectFailDataAxiosError
>(updateTaskComment);

const $updatedCommentData = createStore<TaskCommentResponse | null>(null)
  .on(updateTaskCommentFx.doneData, (_, commentData) => commentData)
  .reset(handleUpdate);

sample({ clock: handleDelete, target: deleteTaskCommentFx });
sample({ clock: handleUpdate, target: updateTaskCommentFx });

deleteTaskCommentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});
updateTaskCommentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

taskProfileService.outputs.$task.on(
  deleteTaskCommentFx.done,
  (prev, { params: { commentId } }) => {
    if (!prev) return prev;
    return {
      ...prev,
      comments: prev.comments
        ? prev.comments.filter((comment) => comment.id !== commentId)
        : prev.comments,
    };
  },
);

export const taskCommentService = {
  inputs: { handleDelete, handleUpdate },
  outputs: { $updatedCommentData },
};
