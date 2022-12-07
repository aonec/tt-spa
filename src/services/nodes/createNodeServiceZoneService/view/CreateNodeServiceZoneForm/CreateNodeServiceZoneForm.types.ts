import { NodeServiceZoneRequest } from 'myApi';

export type CreateNodeServiceZoneFormProps = {
  formId: string;
  handleSubmit: (payload: NodeServiceZoneRequest) => void;
};
