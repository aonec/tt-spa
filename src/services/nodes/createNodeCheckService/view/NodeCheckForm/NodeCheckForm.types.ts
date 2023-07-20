import { NodeCheckResponse, UpdateNodeCheckRequest } from 'api/myApi';

export type NodeCheckFormProps = {
  handleSubmit: (payload: UpdateNodeCheckRequest) => void;
  formId: string;
  initialValues?: NodeCheckResponse;
  isEdit?: boolean;
};
