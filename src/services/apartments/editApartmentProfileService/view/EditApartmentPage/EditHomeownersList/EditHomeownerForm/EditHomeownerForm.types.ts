import { HomeownerAccountCreateRequest } from 'myApi';
import { formInitialValues } from './EditHomeownerForm.constants';

export type EditHomeownerFormProps = {
  formId: string;
  handleSubmit: (data: HomeownerAccountCreateRequest) => void;
  initialValues?: EditHomeownerPayload;
};

export type EditHomeownerPayload = typeof formInitialValues