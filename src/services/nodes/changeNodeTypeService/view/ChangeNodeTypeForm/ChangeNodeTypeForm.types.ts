import { NodeSetRegistrationTypeRequest } from 'myApi';

export type ChangeNodeTypeFormProps = {
  formId: string;
  setNodeTypePaylaod: (payload: NodeSetRegistrationTypeRequest) => void;
};
