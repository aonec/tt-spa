import { HomeownerAccountCreateServiceModel } from 'myApi';

export type EditHomeownerFormProps = {
  formId: string;
  handleSubmit: (data: HomeownerAccountCreateServiceModel) => void;
};
