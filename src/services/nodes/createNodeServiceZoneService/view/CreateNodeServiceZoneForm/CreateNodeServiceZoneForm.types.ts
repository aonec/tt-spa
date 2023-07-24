import { NodeServiceZoneRequest } from 'api/types';

export type CreateNodeServiceZoneFormProps = {
  formId: string;
  handleSubmit: (payload: NodeServiceZoneRequest) => void;
};
