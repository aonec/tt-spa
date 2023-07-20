import { createDomain, forward } from 'effector';
import { deleteTaskComment, updateTaskComment } from './taskCommentService.api';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { TaskCommentRequest, TaskCommentResponse } from 'api/types';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const domain = createDomain('taskCommentService');

const handleDelete = domain.createEvent<{
  taskId: number;
  commentId: number;
}>();

const handleUpdate = domain.createEvent<{
  taskId: number;
  commentId: number;
  data: TaskCommentRequest;
}>();

const deleteTaskCommentFx = domain.createEffect<
  {
    taskId: number;
    commentId: number;
  },
  void,
  EffectFailDataAxiosError
>(deleteTaskComment);

const updateTaskCommentFx = domain.createEffect<
  {
    taskId: number;
    commentId: number;
    data: TaskCommentRequest;
  },
  TaskCommentResponse,
  EffectFailDataAxiosError
>(updateTaskComment);

const $updatedCommentData = domain
  .createStore<TaskCommentResponse | null>(null)
  .on(updateTaskCommentFx.doneData, (_, commentData) => commentData)
  .reset(handleUpdate);

forward({ from: handleDelete, to: deleteTaskCommentFx });
forward({ from: handleUpdate, to: updateTaskCommentFx });

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
