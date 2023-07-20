import { CreateCalculatorRequest } from 'api/myApi';

export type ConnectionSettingsFormProps = {
  formId: string;
  updatePayload: (payload: Partial<CreateCalculatorRequest>) => void;
  initialValues: Partial<CreateCalculatorRequest>;
};
