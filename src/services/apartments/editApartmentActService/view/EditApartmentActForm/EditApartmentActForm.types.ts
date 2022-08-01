import { ApartmentActResponse, EActTypeStringDictionaryItem } from "../../../../../api/types";

export type EditApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
  initialValues: ApartmentActResponse | null;
};
