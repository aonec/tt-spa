import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditPersonalNumberPage } from './view/EditPersonalNumberPage';
import { editPersonalNumberService } from './editPersonalNumberService.model';
import { ConfirmationAddingExistingPersonalNumber } from '../components/ConfirmationAddingExistingPersonalNumberModal';
import { CloseHomeownerAccountModal } from './view/CloseHomeownerAccountModal';

const {
  inputs,
  outputs,
  gates: { ApartmentGate },
} = editPersonalNumberService;

export const EditPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const apartmentId = id;

  const { homeownerId } = useParams<{ homeownerId: string }>();
  const navigate = useNavigate();

  const {
    apartment,
    isLoading,
    isLoadingClosingAccount,
    confirmationModalClose,
    handleCloseHomeownerAccount,
    handleEditHomeownerAccount,
    handleForced,
    isConfirmationModalOpen,
    isVisibleCloseHomeownerAccountModalf,
    samePersonalAccountNumderId,
    setVisibleCloseHomeownerAccountModal,
  } = useUnit({
    isLoading: outputs.$isLoading,
    isLoadingClosingAccount: outputs.$isLoadingClosingAccount,
    apartment: outputs.$apartment,
    isVisibleCloseHomeownerAccountModalf:
      outputs.$isVisibleCloseHomeownerAccountModal,
    isConfirmationModalOpen: outputs.$isConfirmationModalOpen,
    samePersonalAccountNumderId: outputs.$samePersonalAccountNumderId,
    confirmationModalClose: inputs.handleConfirmationModalClose,
    handleForced: inputs.onForced,
    handleEditHomeownerAccount: inputs.handleEditHomeownerAccount,
    handleCloseHomeownerAccount: inputs.handleCloseHomeownerAccount,
    setVisibleCloseHomeownerAccountModal:
      inputs.setVisibleCloseHomeownerAccountModal,
  });

  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );

  useEffect(() => {
    return inputs.successEditHomeownerAccount.watch(() => {
      navigate(`/meters/apartments/${apartmentId}`);
    }).unsubscribe;
  }, [navigate, apartmentId]);

  useEffect(() => {
    return inputs.successCloseHomeownerAccount.watch(() => {
      navigate(`/meters/apartments/${apartmentId}`);
    }).unsubscribe;
  }, [navigate, apartmentId]);

  return (
    <>
      <ApartmentGate apartmentId={Number(apartmentId)} />

      <EditPersonalNumberPage
        isLoading={isLoading}
        handleEditHomeownerAccount={handleEditHomeownerAccount}
        apartment={apartment}
        handleForced={inputs.onForced}
        homeowner={homeowner}
        setVisibleCloseHomeownerAccountModal={
          setVisibleCloseHomeownerAccountModal
        }
      />

      <ConfirmationAddingExistingPersonalNumber
        isConfirmationModalOpen={isConfirmationModalOpen}
        samePersonalAccountNumderId={samePersonalAccountNumderId}
        confirmationModalClose={() => confirmationModalClose()}
        handleForced={handleForced}
      />

      {homeowner && (
        <CloseHomeownerAccountModal
          isLoading={isLoadingClosingAccount}
          homeowner={homeowner}
          isVisible={isVisibleCloseHomeownerAccountModalf}
          setVisible={setVisibleCloseHomeownerAccountModal}
          handleCloseHomeownerAccount={handleCloseHomeownerAccount}
        />
      )}
    </>
  );
};
