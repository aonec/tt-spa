import { OrganizationUpdateRequest } from 'api/types';
import { editCompanyService } from './editCompanyService.model';

export type OrganizationUpdatePayload = OrganizationUpdateRequest & {
  managingFirmId: number;
};

export type EditCompanyFormType =
  typeof editCompanyService.forms.editCompanyForm;
