import { EActResourceType, EActType } from 'api/types';
import { CreateActFormPayload } from '../../createApartmentActService.types';

export type CreateApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: CreateActFormPayload) => void;
};

export const actResourceTypes = Object.values(EActResourceType);

export const documentTypes = Object.values(EActType);
