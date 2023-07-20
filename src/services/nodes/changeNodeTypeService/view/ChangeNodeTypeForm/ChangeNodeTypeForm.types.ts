import { NodeSetRegistrationTypeRequest } from 'api/types';

export type ChangeNodeTypeFormProps = {
  formId: string;
  setNodeTypePaylaod: (payload: NodeSetRegistrationTypeRequest) => void;
};
