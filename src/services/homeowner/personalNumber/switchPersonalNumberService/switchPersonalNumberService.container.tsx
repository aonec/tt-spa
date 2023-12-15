import React, { useEffect } from 'react';
import { switchPersonalNumberService } from './switchPersonalNumberService.model';
import { SwitchPersonalNumberPage } from './view/SwitchPersonalNumberPage';
import { ConfirmationAddingExistingPersonalNumber } from '../components/ConfirmationAddingExistingPersonalNumberModal';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';

const {
  inputs,
  outputs,
  gates: { ApartmentGate },
} = switchPersonalNumberService;

export const SwitchPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const apartmentId = id;

  const { homeownerId } = useParams<{ homeownerId: string }>();
  const navigate = useNavigate();

  const {
    apartment,
    confirmationModalClose,
    handleForced,
    handleSwitchHomeownerAccount,
    isConfirmationModalOpen,
    isLoading,
    samePersonalAccountNumderId,
  } = useUnit({
    isLoading: outputs.$isLoading,
    apartment: outputs.$apartment,
    isConfirmationModalOpen: outputs.$isConfirmationModalOpen,
    samePersonalAccountNumderId: outputs.$samePersonalAccountNumderId,
    confirmationModalClose: inputs.handleConfirmationModalClose,
    handleForced: inputs.onForced,
    handleSwitchHomeownerAccount: inputs.handleSwitchHomeownerAccount,
  });

  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );

  useEffect(() => {
    return inputs.successSwitchHomeownerAccount.watch(() => {
      navigate(`/meters/apartments/${apartmentId}`);
    }).unsubscribe;
  }, [navigate, apartmentId]);

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
