import { NodeSetRegistrationTypeRequest, PipeNodeResponse } from 'myApi';

export type ChangeNodeTypeFormProps = {
  formId: string;
  node: PipeNodeResponse;
  setNodeTypePaylaod: (payload: NodeSetRegistrationTypeRequest) => void;
};
