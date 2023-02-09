import { createDomain, merge, sample } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorCommentResponse } from 'myApi';
import {
  fetchCreateComment,
  fetchRemoveComment,
  fetchUpdateComment,
} from './calculatorCommentService.api';
import { CalculatorCommentPayload } from './calculatorCommentService.types';

const domain = createDomain('calculatorCommentService');

const removeComment = domain.createEvent();
const removeCommentFx = domain.createEffect<number, void>(fetchRemoveComment);

const createComment = domain.createEvent<string>();
const createCommentFx = domain.createEffect<
  CalculatorCommentPayload,
  CalculatorCommentResponse
>(fetchCreateComment);

const editComment = domain.createEvent<string>();
const editCommentFx = domain.createEffect<
  CalculatorCommentPayload,
  CalculatorCommentResponse
>(fetchUpdateComment);

const CalculatorIdGate = createGate<{ calculatorId: number }>();

const commentEdited = merge([createCommentFx.doneData, editCommentFx.doneData]);
const commentDelited = removeCommentFx.doneData;

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

export const calculatorCommentService = {
  inputs: {
    removeComment,
    editComment,
    createComment,
    commentEdited,
    commentDelited,
  },
  gates: { CalculatorIdGate },
};
