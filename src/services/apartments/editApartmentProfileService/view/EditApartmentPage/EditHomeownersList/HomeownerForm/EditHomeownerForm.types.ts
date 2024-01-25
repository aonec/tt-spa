import { HomeownerAccountCreateRequest } from 'api/types';
import { formInitialValues } from './EditHomeownerForm.constants';

export type EditHomeownerPayload = Omit<
  typeof formInitialValues,
  'phoneNumbers'
>;

export type EditHomeownerFormik = EditHomeownerPayload & {
  phoneNumbers?: string[];
};

export type EditHomeownerFormProps = {
  formId: string;
  initialValues?: EditHomeownerPayload;
  handleCreateHomeowner?: (payload: HomeownerAccountCreateRequest) => void;
  handleEditHomeownerPreparation?: (payload: EditHomeownerPayload) => void;
  isEdit?: boolean;
};
