import { HomeownerAccountCreateRequest } from 'api/types';
import { formInitialValues } from './EditHomeownerForm.constants';

export type EditHomeownerPayload = typeof formInitialValues;

export type EditHomeownerFormProps = {
  formId: string;
  initialValues?: EditHomeownerPayload;
  handleCreateHomeowner?: (payload: HomeownerAccountCreateRequest) => void;
  handleEditHomeownerPreparation?: (payload: EditHomeownerPayload) => void;
  isEdit?: boolean;
};
