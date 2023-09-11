import { ApartmentActResponse } from 'api/types';
import { EditActFormType } from '../../editApartmentActService.types';

export type EditApartmentActFormProps = {
  formId: string;
  initialValues: ApartmentActResponse | null;
  handleDeleteAct: () => void;
  form: EditActFormType;
};
