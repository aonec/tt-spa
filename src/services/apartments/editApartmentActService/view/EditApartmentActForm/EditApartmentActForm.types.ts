import { ApartmentActResponse } from 'api/types';
import { EditActFormPayload } from '../../editApartmentActService.types';

export type EditApartmentActFormProps = {
  formId: string;
  initialValues: ApartmentActResponse | null;
  handleDeleteAct: () => void;
  handleSubmitForm: (payload: EditActFormPayload) => void;
};
