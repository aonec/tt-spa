import { CreateCalculatorRequest } from 'myApi';

export type ConnectionSettingsFormProps = {
  formId: string;
  updatePayload: (payload: Partial<CreateCalculatorRequest>) => void;
  initialValues: Partial<CreateCalculatorRequest>;
};
