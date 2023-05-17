import React, { useEffect } from 'react';
import { AddPersonalNumberPage } from './view/AddPersonalNumberPage';
import { addPersonalNumberService } from './addPersonalNumberService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { ConfirmationAddingExistingPersonalNumber } from '../components/ConfirmationAddingExistingPersonalNumberModal';

const {
  inputs,
  outputs,
  gates: { ApartmentGate },
} = addPersonalNumberService;

export const AddPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const apartment = useStore(outputs.$apartment);
  const isLoading = useStore(outputs.$isLoading);

  const isConfirmationModalOpen = useStore(outputs.$isConfirmationModalOpen);
  const samePersonalAccountNumderId = useStore(
    outputs.$samePersonalAccountNumderId,
  );
  const confirmationModalClose = useEvent(inputs.handleConfirmationModalClose);
  const handleForced = useEvent(inputs.onForced);

  const handleAddPersonalNumber = useEvent(inputs.handleAddPersonalNumber);

  useEffect(() => {
    return inputs.successAddPersonalNumber.watch(() => {
      history.push(`/meters/apartments/${apartment?.id}`);
    }).unsubscribe;
  }, [history, apartment?.id]);

  return (
    <>
      <ApartmentGate apartmentId={Number(id)} />

      <AddPersonalNumberPage
        apartment={apartment}
        isLoading={isLoading}
        handleAddPersonalNumber={handleAddPersonalNumber}
        handleForced={inputs.onForced}
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
