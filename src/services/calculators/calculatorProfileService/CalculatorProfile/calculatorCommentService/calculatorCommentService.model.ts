import { createEffect, createEvent, createStore } from 'effector';
import { merge, sample } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorCommentResponse } from 'api/types';
import {
  fetchCreateComment,
  fetchRemoveComment,
  fetchUpdateComment,
} from './calculatorCommentService.api';
import { CalculatorCommentPayload } from './calculatorCommentService.types';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const removeComment = createEvent();
const removeCommentFx = createEffect<number, void, EffectFailDataAxiosError>(
  fetchRemoveComment,
);

const createComment = createEvent<string>();
const createCommentFx = createEffect<
  CalculatorCommentPayload,
  CalculatorCommentResponse,
  EffectFailDataAxiosError
>(fetchCreateComment);

const editComment = createEvent<string>();
const editCommentFx = createEffect<
  CalculatorCommentPayload,
  CalculatorCommentResponse,
  EffectFailDataAxiosError
>(fetchUpdateComment);

const CalculatorIdGate = createGate<{ calculatorId: number }>();

const commentEdited = merge([createCommentFx.doneData, editCommentFx.doneData]);
const commentDelited = removeCommentFx.doneData;

const $commentResponseData = createStore<CalculatorCommentResponse | null>(null)
  .on(createCommentFx.doneData, (_, comment) => comment)
  .on(editCommentFx.doneData, (_, comment) => comment);

const $calculatorId = CalculatorIdGate.state.map(
  ({ calculatorId }) => calculatorId || null,
);

sample({
  clock: removeComment,
  source: $calculatorId,
  filter: Boolean,
  target: removeCommentFx,
});

sample({
  source: $calculatorId,
  clock: createComment,
  filter: Boolean,
  fn: (deviceId, text) => ({ deviceId, text }),
  target: createCommentFx,
});

sample({
  source: $calculatorId,
  clock: editComment,
  filter: Boolean,
  fn: (deviceId, text) => ({ deviceId, text }),
  target: editCommentFx,
});

createCommentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

removeCommentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

editCommentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const calculatorCommentService = {
  outputs: { $commentResponseData },
  inputs: {
    removeComment,
    editComment,
    createComment,
    commentEdited,
    commentDelited,
  },
  gates: { CalculatorIdGate },
};
