import { CalculatorCommentResponse } from 'api/types';

export type CalculatorCommentContainerProps = {
  comment: CalculatorCommentResponse | null;
  calculatorId: number;
};

export type CalculatorCommentPayload = {
  text: string;
  deviceId: number;
};
