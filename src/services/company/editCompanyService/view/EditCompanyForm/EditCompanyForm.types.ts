import { EditCompanyFormType } from '../../editCompanyService.types';

export type EditCompanyFormProps = {
  existingCities: string[];
  isUpdating: boolean;
  form: EditCompanyFormType;
};
