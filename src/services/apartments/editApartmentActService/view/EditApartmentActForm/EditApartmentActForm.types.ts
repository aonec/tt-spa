import { ApartmentActResponse, EActTypeStringDictionaryItem } from 'myApi';

export type EditApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
  initialValues: ApartmentActResponse | null;
};
