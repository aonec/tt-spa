import { OrganizationUserListResponse } from 'api/types';

export type AddPerpetratorSelectProps = {
  users: OrganizationUserListResponse[];
  handlePerpetratorChange: (userId: number | null) => void;
};
