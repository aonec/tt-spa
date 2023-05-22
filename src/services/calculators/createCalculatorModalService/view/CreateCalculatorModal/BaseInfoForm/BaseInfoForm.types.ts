import { CreateCalculatorPayload } from '../CreateCalculatorModal.types';

export type BaseInfoFormProps = {
  calculatorTypes: {
    id: number;
    value: number;
    model: string;
    label: string;
  }[];
  formId: string;
  updatePayload: (payload: CreateCalculatorPayload) => void;
  initialValues: CreateCalculatorPayload;
};
