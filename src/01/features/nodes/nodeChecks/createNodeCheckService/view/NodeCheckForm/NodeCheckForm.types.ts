import { NodeCheckResponse, UpdateNodeCheckRequest } from 'myApi';

export type NodeCheckFormProps = {
  handleSubmit: (payload: UpdateNodeCheckRequest) => void;
  formId: string;
  initialValues?: NodeCheckResponse;
};
