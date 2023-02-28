import { OrganizationUpdateRequest } from 'myApi';

export type OrganizationUpdatePayload = OrganizationUpdateRequest & {
  managingFirmId: number;
};
