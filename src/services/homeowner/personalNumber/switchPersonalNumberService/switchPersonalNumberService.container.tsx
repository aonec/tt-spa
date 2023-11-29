import React, { useEffect } from 'react';
import { switchPersonalNumberService } from './switchPersonalNumberService.model';
import { SwitchPersonalNumberPage } from './view/SwitchPersonalNumberPage';
import { ConfirmationAddingExistingPersonalNumber } from '../components/ConfirmationAddingExistingPersonalNumberModal';
import { useEvent, useStore } from 'effector-react';
import {  useNavigate, useParams } from 'react-router-dom';

const {
  inputs,
  outputs,
  gates: { ApartmentGate },
} = switchPersonalNumberService;

export const SwitchPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const apartmentId = id;

  const { homeownerId } = useParams<{ homeownerId: string }>();
  const history =  useNavigate();

  const isLoading = useStore(outputs.$isLoading);
  const apartment = useStore(outputs.$apartment);
  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );

  const isConfirmationModalOpen = useStore(outputs.$isConfirmationModalOpen);
  const samePersonalAccountNumderId = useStore(
    outputs.$samePersonalAccountNumderId,
  );
  const confirmationModalClose = useEvent(inputs.handleConfirmationModalClose);
  const handleForced = useEvent(inputs.onForced);

  const handleSwitchHomeownerAccount = useEvent(
    inputs.handleSwitchHomeownerAccount,
  );

  useEffect(() => {
    return inputs.successSwitchHomeownerAccount.watch(() => {
       history(`/meters/apartments/${apartmentId}`);
    }).unsubscribe;
  }, [history, apartmentId]);

  return (
    <>
      <ApartmentGate apartmentId={Number(apartmentId)} />
      <SwitchPersonalNumberPage
        isLoading={isLoading}
        handleSwitchHomeownerAccount={handleSwitchHomeownerAccount}
        apartment={apartment}
        handleForced={inputs.onForced}
        homeowner={homeowner}
      />

      <ConfirmationAddingExistingPersonalNumber
        isConfirmationModalOpen={isConfirmationModalOpen}
        samePersonalAccountNumderId={samePersonalAccountNumderId}
        confirmationModalClose={() => confirmationModalClose()}
        handleForced={handleForced}
      />
    </>
  );
};
