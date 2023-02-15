import { HomeownerAccountCreateRequest } from 'myApi';
import { EditHomeownerRequestPayload } from '../editHomeownerService/editHomeownerService.types';
import { formInitialValues } from './EditHomeownerForm.constants';

export type EditHomeownerPayload = typeof formInitialValues;

export type EditHomeownerFormProps = {
  formId: string;
  initialValues?: EditHomeownerPayload;
  handleCreateHomeowner?: (payload: HomeownerAccountCreateRequest) => void;
  handleEditHomeownerPreparation?: (
    payload: EditHomeownerRequestPayload,
  ) => void;
  isEdit?: boolean;
};
