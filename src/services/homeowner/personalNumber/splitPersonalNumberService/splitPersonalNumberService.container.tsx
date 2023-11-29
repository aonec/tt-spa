import React, { useEffect } from 'react';
import { splitPersonalNumberService } from './splitPersonalNumberService.model';
import { SplitPersonalNumberPage } from './view/SplitPersonalNumberPage';
import { useEvent, useStore } from 'effector-react';
import {  useNavigate, useParams } from 'react-router-dom';
import { ConfirmationAddingExistingPersonalNumber } from '../components/ConfirmationAddingExistingPersonalNumberModal';
import { ConfirmUsingExistingArartmentModal } from '../components/ConfirmUsingExistingApartmentModal/ConfirmUsingExistingArartmentModal';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';

const { AllIndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

const {
  inputs,
  outputs,
  gates: { ApartmentGate, IndividualDevicesGate, SplitPageGate },
} = splitPersonalNumberService;

export const SplitPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const apartmentId = id;

  const { homeownerId } = useParams<{ homeownerId: string }>();
  const history =  useNavigate();

  const stageNumber = useStore(outputs.$stageNumber);

  const apartment = useStore(outputs.$apartment);
  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );
  const individualDevices = useStore(outputs.$individualDevices);

  const switchStageData = useStore(outputs.$switchStageData);
  const addNewApartmentStageData = useStore(outputs.$addNewApartmentStageData);
  const transferDevicesData = useStore(outputs.$transferDevicesData);

  const isConfirmationModalOpen = useStore(outputs.$isConfirmationModalOpen);
  const samePersonalAccountNumderId = useStore(
    outputs.$samePersonalAccountNumderId,
  );

  const isCheckApartLoading = useStore(outputs.$isCheckApartLoading);

  const handleSubmitSwitchStage = useEvent(inputs.handleSubmitSwitchStage);
  const handleSubmitAddNewApartmentStage = useEvent(
    inputs.handleSubmitAddNewApartmentStage,
  );
  const handleSubmitTransferDevicesStage = useEvent(
    inputs.handleSubmitTransferDevicesStage,
  );
  const handleCheckApartmentExist = useEvent(inputs.handleCheckApartmentExist);

  const goBackStage = useEvent(inputs.goBackStage);

  const handleForceConfirmationModalClose = useEvent(
    inputs.handleForceConfirmationModalClose,
  );
  const onForced = useEvent(inputs.onForced);

  useEffect(() => {
    return inputs.successSplit.watch(() => {
       history(`/meters/apartments/${apartmentId}`);
    });
  }, [history, apartmentId]);

  return (
    <>
      <SplitPageGate />
      <ApartmentGate apartmentId={Number(apartmentId)} />
      <IndividualDevicesGate ApartmentId={Number(apartmentId)} />
      <AllIndividualDeviceMountPlacesGate />
      <ConfirmationAddingExistingPersonalNumber
        isConfirmationModalOpen={isConfirmationModalOpen}
        samePersonalAccountNumderId={samePersonalAccountNumderId}
        confirmationModalClose={() => handleForceConfirmationModalClose()}
        handleForced={onForced}
      />
      <ConfirmUsingExistingArartmentModal />
      <SplitPersonalNumberPage
        stageNumber={stageNumber}
        apartment={apartment}
        homeowner={homeowner}
        handleSubmitSwitchStage={handleSubmitSwitchStage}
        handleSubmitAddNewApartmentStage={handleSubmitAddNewApartmentStage}
        goBackStage={goBackStage}
        switchStageData={switchStageData}
        addNewApartmentStageData={addNewApartmentStageData}
        transferDevicesData={transferDevicesData}
        individualDevices={individualDevices}
        handleSubmitTransferDevicesStage={handleSubmitTransferDevicesStage}
        handleCheckApartmentExist={handleCheckApartmentExist}
        isCheckApartLoading={isCheckApartLoading}
      />
    </>
  );
};
