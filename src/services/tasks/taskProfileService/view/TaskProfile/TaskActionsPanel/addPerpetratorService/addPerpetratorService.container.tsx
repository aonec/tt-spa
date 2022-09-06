import { useStore } from 'effector-react';
import React from 'react';
import { addPerpetratorService } from './addPerpetratorService.model';
import { AddPerpetratorSelect } from './view/AddPerpetratorSelect';

const { outputs, gates } = addPerpetratorService;

const { OrganizationUsersGate } = gates;

export const AddPerpetratorContainer = () => {
  const organizationUsers = useStore(outputs.$organizationUsers);

  return (
    <>
      <OrganizationUsersGate />
      <AddPerpetratorSelect users={organizationUsers} />
    </>
  );
};
