import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  const history = useHistory();

  const isLoading = useStore(outputs.$isLoading);
  const isLoadingClosingAccount = useStore(outputs.$isLoadingClosingAccount);
  const apartment = useStore(outputs.$apartment);
  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );

  const isVisibleCloseHomeownerAccountModalf = useStore(
    outputs.$isVisibleCloseHomeownerAccountModal,
  );
  const isConfirmationModalOpen = useStore(outputs.$isConfirmationModalOpen);
  const samePersonalAccountNumderId = useStore(
    outputs.$samePersonalAccountNumderId,
  );
  const confirmationModalClose = useEvent(inputs.handleConfirmationModalClose);
  const handleForced = useEvent(inputs.onForced);

  const handleEditHomeownerAccount = useEvent(
    inputs.handleEditHomeownerAccount,
  );
  const handleCloseHomeownerAccount = useEvent(
    inputs.handleCloseHomeownerAccount,
  );
  const setVisibleCloseHomeownerAccountModal = useEvent(
    inputs.setVisibleCloseHomeownerAccountModal,
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
        handleForced={inputs.onForced}
        homeowner={homeowner}
        setVisibleCloseHomeownerAccountModal={setVisibleCloseHomeownerAccountModal}
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
