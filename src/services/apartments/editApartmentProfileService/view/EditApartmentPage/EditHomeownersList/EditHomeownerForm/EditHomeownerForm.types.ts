import { HomeownerAccountCreateServiceModel } from 'myApi';
import { formInitialValues } from './EditHomeownerForm.constants';

export type EditHomeownerFormProps = {
  formId: string;
  handleSubmit: (data: HomeownerAccountCreateServiceModel) => void;
  initialValues?: EditHomeownerPayload;
};

export type EditHomeownerPayload = typeof formInitialValues