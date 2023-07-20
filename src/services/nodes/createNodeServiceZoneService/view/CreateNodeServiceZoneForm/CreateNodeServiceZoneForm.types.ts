import { NodeServiceZoneRequest } from 'api/myApi';

export type CreateNodeServiceZoneFormProps = {
  formId: string;
  handleSubmit: (payload: NodeServiceZoneRequest) => void;
};
