import { OrganizationUpdateRequest } from 'api/types';

export type OrganizationUpdatePayload = OrganizationUpdateRequest & {
  managingFirmId: number;
};
