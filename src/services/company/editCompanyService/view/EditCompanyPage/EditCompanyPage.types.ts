import { OrganizationResponse, OrganizationUpdateRequest } from 'myApi';

export type EditCompanyPageProps = {
  currentManagingFirm: OrganizationResponse | null;
  handleUpdateOrganization: (payload: OrganizationUpdateRequest) => void;
  existingCities: string[];
  isUpdating: boolean;
};
