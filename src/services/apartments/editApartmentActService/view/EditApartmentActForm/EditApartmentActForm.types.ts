import { ApartmentActResponse } from 'api/types';

export type EditApartmentActFormProps = {
  formId: string;
  handleSubmit: (payload: any) => void;
  initialValues: ApartmentActResponse | null;
  handleDeleteAct: () => void;
};
