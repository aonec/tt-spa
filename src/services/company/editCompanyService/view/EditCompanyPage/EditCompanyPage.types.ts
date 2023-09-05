import { OrganizationResponse } from 'api/types';
import { EditCompanyFormType } from '../../editCompanyService.types';

export type EditCompanyPageProps = {
  currentManagingFirm: OrganizationResponse | null;
  existingCities: string[];
  isUpdating: boolean;
  form: EditCompanyFormType;
};
