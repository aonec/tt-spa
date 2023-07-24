import { createDomain, merge, sample } from 'effector';
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

const domain = createDomain('calculatorCommentService');

const removeComment = domain.createEvent();
const removeCommentFx = domain.createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(fetchRemoveComment);

const createComment = domain.createEvent<string>();
const createCommentFx = domain.createEffect<
  CalculatorCommentPayload,
  CalculatorCommentResponse,
  EffectFailDataAxiosError
>(fetchCreateComment);

const editComment = domain.createEvent<string>();
const editCommentFx = domain.createEffect<
  CalculatorCommentPayload,
  CalculatorCommentResponse,
  EffectFailDataAxiosError
>(fetchUpdateComment);

const CalculatorIdGate = createGate<{ calculatorId: number }>();

const commentEdited = merge([createCommentFx.doneData, editCommentFx.doneData]);
const commentDelited = removeCommentFx.doneData;

const $commentResponseData = domain
  .createStore<CalculatorCommentResponse | null>(null)
  .on(createCommentFx.doneData, (_, comment) => comment)
  .on(editCommentFx.doneData, (_, comment) => comment);

sample({
  source: CalculatorIdGate.state.map(({ calculatorId }) => calculatorId),
  clock: removeComment,
  target: removeCommentFx,
});

sample({
  source: CalculatorIdGate.state.map(({ calculatorId }) => calculatorId),
  clock: createComment,
  fn: (deviceId, text) => ({ deviceId, text }),
  target: createCommentFx,
});

sample({
  source: CalculatorIdGate.state.map(({ calculatorId }) => calculatorId),
  clock: editComment,
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
