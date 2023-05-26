import { EActResourceType, EActType } from 'myApi';

export type CreateApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
};

export const actResourceTypes = Object.values(EActResourceType);

export const documentTypes = Object.values(EActType);
