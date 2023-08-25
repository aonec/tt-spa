import { NodeCheckResponse, UpdateNodeCheckRequest } from 'api/types';

export type NodeCheckFormProps = {
  handleSubmit: (payload: UpdateNodeCheckRequest) => void;
  formId: string;
  initialValues?: NodeCheckResponse;
  isEdit?: boolean;
};
