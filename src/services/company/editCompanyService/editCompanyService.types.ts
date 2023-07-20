import { OrganizationUpdateRequest } from 'api/myApi';

export type OrganizationUpdatePayload = OrganizationUpdateRequest & {
  managingFirmId: number;
};
