import { axios } from 'api/axios';
import { OrganizationResponse } from 'api/myApi';
import { OrganizationUpdatePayload } from './editCompanyService.types';

export const fetchUpdateOrganization = ({
  managingFirmId,
  ...payload
}: OrganizationUpdatePayload): Promise<void> =>
  axios.put(`/Organizations/${managingFirmId}`, payload);

export const fetchCurrentManagingFirm = (): Promise<OrganizationResponse> =>
  axios.get('Organizations/current');
