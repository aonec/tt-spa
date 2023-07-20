import { EActResourceType, EActType } from 'api/myApi';

export type CreateApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
};

export const actResourceTypes = Object.values(EActResourceType);

export const documentTypes = Object.values(EActType);
