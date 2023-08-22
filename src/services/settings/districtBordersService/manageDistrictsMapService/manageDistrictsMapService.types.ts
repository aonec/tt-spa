import { DistrictUpdateRequest } from 'api/types';

export type UpdateDistrictRequestPayload = DistrictUpdateRequest & {
  id: string;
};
