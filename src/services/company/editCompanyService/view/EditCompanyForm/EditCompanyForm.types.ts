import { OrganizationResponse, OrganizationUpdateRequest } from 'api/types';

export type EditCompanyFormProps = {
  currentManagingFirm: OrganizationResponse;
  handleUpdateOrganization: (payload: OrganizationUpdateRequest) => void;
  existingCities: string[];
  isUpdating: boolean;
};
