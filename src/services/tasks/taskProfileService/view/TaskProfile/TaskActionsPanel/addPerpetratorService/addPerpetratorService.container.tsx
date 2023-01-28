import { useStore } from 'effector-react';
import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { addPerpetratorService } from './addPerpetratorService.model';
import { AddPerpetratorSelect } from './view/AddPerpetratorSelect';

const { outputs, gates } = addPerpetratorService;

const { OrganizationUsersGate } = gates;

export const AddPerpetratorContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const organizationUsers = useStore(outputs.$organizationUsers);

  const handlePerpetratorChange = useCallback(
    (userId: number | null) => {
      if (userId) handleChange({ nextPerpetratorId: userId });
    },
    [handleChange]
  );

  return (
    <>
      <OrganizationUsersGate />
      <AddPerpetratorSelect
        users={organizationUsers}
        handlePerpetratorChange={handlePerpetratorChange}
      />
    </>
  );
};
