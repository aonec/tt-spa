import { ApartmentActResponse } from 'api/myApi';

export type EditApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
  initialValues: ApartmentActResponse | null;
  handleDeleteAct: () => void;
};
