import { NodeSetRegistrationTypeRequest } from 'api/myApi';

export type ChangeNodeTypeFormProps = {
  formId: string;
  setNodeTypePaylaod: (payload: NodeSetRegistrationTypeRequest) => void;
};
