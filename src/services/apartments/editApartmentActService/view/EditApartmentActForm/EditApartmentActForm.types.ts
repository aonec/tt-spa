import { ApartmentActResponse } from 'myApi';

export type EditApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
  initialValues: ApartmentActResponse | null;
  handleDeleteAct: () => void;
};
