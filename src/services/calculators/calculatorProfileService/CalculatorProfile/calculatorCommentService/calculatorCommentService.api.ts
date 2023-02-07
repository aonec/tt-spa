import { axios } from '01/axios';
import { CalculatorCommentResponse } from 'myApi';
import { CalculatorCommentPayload } from './calculatorCommentService.types';

export const fetchRemoveComment = (deviceId: number): Promise<void> =>
  axios.delete(`Calculators/${deviceId}/comment`);

export const fetchCreateComment = ({
  deviceId,
  text,
}: CalculatorCommentPayload): Promise<CalculatorCommentResponse> =>
  axios.post(`Calculators/${deviceId}/comment`, { text });

export const fetchUpdateComment = ({
  deviceId,
  text,
}: CalculatorCommentPayload): Promise<CalculatorCommentResponse> =>
  axios.put(`Calculators/${deviceId}/comment`, { text });
