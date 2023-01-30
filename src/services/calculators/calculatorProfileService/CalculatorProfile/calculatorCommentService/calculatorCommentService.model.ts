import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { fetchRemoveComment } from './calculatorCommentService.api';

const domain = createDomain('calculatorCommentService');

const removeComment = domain.createEvent();
const removeCommentFx = domain.createEffect<number, void>(fetchRemoveComment);

const CalculatorIdGate = createGate<{ calculatorId: number }>();

sample({
  source: CalculatorIdGate.state.map(({ calculatorId }) => calculatorId),
  clock: removeComment,
  target: removeCommentFx,
});

export const calculatorCommentService = {
  inputs: {
    removeComment,
  },
  gates: { CalculatorIdGate },
};
