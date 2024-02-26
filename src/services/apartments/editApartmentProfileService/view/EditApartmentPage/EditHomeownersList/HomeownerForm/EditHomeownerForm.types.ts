import { HomeownerAccountCreateRequest } from 'api/types';
import { formInitialValues } from './EditHomeownerForm.constants';
import { EditHomeownerFormPayload } from '../editHomeownerService/editHomeownerService.types';

export type EditHomeownerPayload = Omit<
  typeof formInitialValues,
  'phoneNumbers'
>;

export type EditHomeownerFormik = EditHomeownerPayload & {
  phoneNumbers?: string[];
};

export type EditHomeownerFormProps = {
  formId: string;
  initialValues?: EditHomeownerFormPayload;
  handleCreateHomeowner?: (payload: HomeownerAccountCreateRequest) => void;
  handleEditHomeownerPreparation?: (payload: EditHomeownerPayload) => void;
  isEdit?: boolean;
};
