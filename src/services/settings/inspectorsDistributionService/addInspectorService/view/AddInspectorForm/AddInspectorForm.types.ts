import { InspectorCreateRequest } from 'api/types';

export type AddInspectorFormProps = {
  formId: string;
  handleAddInspector: (payload: InspectorCreateRequest) => void;
};

export type AddInspectorFormik = {
  lastName: string;
  firstName: string;
  midleName: string;
};
