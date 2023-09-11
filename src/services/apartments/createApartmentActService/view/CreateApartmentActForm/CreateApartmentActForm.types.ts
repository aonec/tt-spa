import { EActResourceType, EActType } from 'api/types';
import { CreateActFormType } from '../../createApartmentActService.types';

export type CreateApartmentActFormProps = {
  formId: string;
  form: CreateActFormType;
};

export const actResourceTypes = Object.values(EActResourceType);

export const documentTypes = Object.values(EActType);
