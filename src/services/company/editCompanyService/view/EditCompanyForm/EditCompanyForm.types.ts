import { OrganizationResponse, OrganizationUpdateRequest } from 'myApi';

export type EditCompanyFormProps = {
  currentManagingFirm: OrganizationResponse;
  handleUpdateOrganization: (payload: OrganizationUpdateRequest) => void;
  existingCities: string[];
  isUpdating: boolean;
};
