import { OrganizationUserListResponse } from 'myApi';

export type AddPerpetratorSelectProps = {
  users: OrganizationUserListResponse[];
  handlePerpetratorChange: (userId: number | null) => void;
};
