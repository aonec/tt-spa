import { CalculatorCommentResponse } from 'api/myApi';

export type CalculatorCommentContainerProps = {
  comment: CalculatorCommentResponse | null;
  calculatorId: number;
};

export type CalculatorCommentPayload = {
  text: string;
  deviceId: number;
};
