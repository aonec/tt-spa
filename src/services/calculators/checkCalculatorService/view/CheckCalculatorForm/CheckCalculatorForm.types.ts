import { CheckCalculatorFormik } from '../../checkCalculatorService.types';

export type CheckCalculatorFormProps = {
  formId: string;
  handleCheckCalculator: (payload: CheckCalculatorFormik) => void;
};
