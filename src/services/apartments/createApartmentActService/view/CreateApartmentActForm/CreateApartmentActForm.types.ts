import {
  EActResourceType,
  EActType,
  EActTypeStringDictionaryItem,
} from '../../api/types';

export type CreateApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
};

export const actResourceTypes = Object.values(EActResourceType);

export const documentTypes = Object.values(EActType);
