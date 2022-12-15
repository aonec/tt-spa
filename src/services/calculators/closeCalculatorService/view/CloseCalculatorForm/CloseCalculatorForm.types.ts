import { CalculatorResponse } from 'myApi';
import { CloseCalculatorFormik } from '../../closeCalculatorService.types';

export type CloseCalculatorFormProps = {
  handleSubmit: (payload: CloseCalculatorFormik) => void;
  formId: string;
};
