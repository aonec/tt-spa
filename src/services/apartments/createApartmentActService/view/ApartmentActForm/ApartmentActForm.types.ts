import { EActResourceType, EActType, EActTypeStringDictionaryItem } from "myApi";

export type apartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
};

export const actResourceTypes = Object.values(EActResourceType);

export const documentTypes = Object.values(EActType);

