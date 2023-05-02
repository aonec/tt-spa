import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EditPersonalNumberPage } from './view/EditPersonalNumberPage';
import { editPersonalNumberService } from './editPersonalNumberService.model';

const {
  inputs,
  outputs,
  gates: { ApartmentGate },
} = editPersonalNumberService;

export const EditPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const apartmentId = id;
  const history = useHistory();

  const isLoading = useStore(outputs.$isLoading);
  const apartment = useStore(outputs.$apartment);

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
      <ApartmentGate apartmentId={Number(apartmentId)} />

      <EditPersonalNumberPage
        isLoading={isLoading}
        handleEditHomeownerAccount={handleEditHomeownerAccount}
        apartment={apartment}
      />
    </>
  );
};
