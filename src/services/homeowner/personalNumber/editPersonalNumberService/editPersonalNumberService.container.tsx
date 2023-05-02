import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EditPersonalNumberPage } from './view/EditPersonalNumberPage';
import { editPersonalNumberService } from './editPersonalNumberService.model';

const {
  inputs,
  outputs,
  gates: { HomeownerGate },
} = editPersonalNumberService;

export const EditPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const apartmentId = id;
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const history = useHistory();

  const isLoading = useStore(outputs.$isLoading);
  const homeowner = useStore(outputs.$homeowner);

  const handleEditHomeownerAccount = useEvent(
    inputs.handleEditHomeownerAccount,
  );

  useEffect(() => {
    return inputs.successEditHomeownerAccount.watch(() => {
      history.push(`/meters/apartments/${apartmentId}`);
    }).unsubscribe;
  }, [history, apartmentId]);

  return (
    <>
      <HomeownerGate id={homeownerId} />

      <EditPersonalNumberPage
        homeowner={homeowner}
        isLoading={isLoading}
        handleEditHomeownerAccount={handleEditHomeownerAccount}
      />
    </>
  );
};
