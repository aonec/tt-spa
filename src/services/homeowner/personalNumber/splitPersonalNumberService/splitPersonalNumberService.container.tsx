import React from 'react';
import { splitPersonalNumberService } from './splitPersonalNumberService.model';
import { SplitPersonalNumberPage } from './view/SplitPersonalNumberPage';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';

const {
  inputs,
  outputs,
  gates: { ApartmentGate },
} = splitPersonalNumberService;

export const SplitPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const apartmentId = id;

  const { homeownerId } = useParams<{ homeownerId: string }>();
  const history = useHistory();

  const stageNumber = useStore(outputs.$stageNumber);

  const apartment = useStore(outputs.$apartment);
  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );

  const handleSubmitSwitchStage = useEvent(inputs.handleSubmitSwitchStage);
  const handleSubmitAddNewApartmentStage = useEvent(
    inputs.handleSubmitAddNewApartmentStage,
  );
  const handleSubmitTransferDevicesStage = useEvent(
    inputs.handleSubmitTransferDevicesStage,
  );

  return (
    <>
      <ApartmentGate apartmentId={Number(apartmentId)} />
      <SplitPersonalNumberPage
        stageNumber={stageNumber}
        apartment={apartment}
        homeowner={homeowner}
        handleSubmitSwitchStage={handleSubmitSwitchStage}
        handleSubmitAddNewApartmentStage={handleSubmitAddNewApartmentStage}
      />
    </>
  );
};
