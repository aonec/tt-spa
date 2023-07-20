import { OrganizationUserListResponse } from 'api/myApi';

export type AddPerpetratorSelectProps = {
  users: OrganizationUserListResponse[];
  handlePerpetratorChange: (userId: number | null) => void;
};
