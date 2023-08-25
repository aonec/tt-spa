import { CreateCalculatorRequest } from 'api/types';

export type ConnectionSettingsFormProps = {
  formId: string;
  updatePayload: (payload: Partial<CreateCalculatorRequest>) => void;
  initialValues: Partial<CreateCalculatorRequest>;
};
