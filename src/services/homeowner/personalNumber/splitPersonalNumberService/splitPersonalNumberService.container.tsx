import React, { useEffect } from 'react';
import { splitPersonalNumberService } from './splitPersonalNumberService.model';
import { SplitPersonalNumberPage } from './view/SplitPersonalNumberPage';
import { useUnit } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
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
  const history = useHistory();
  const {
    addNewApartmentStageData,
    apartment,
    goBackStage,
    handleCheckApartmentExist,
    handleForceConfirmationModalClose,
    handleSubmitAddNewApartmentStage,
    handleSubmitSwitchStage,
    handleSubmitTransferDevicesStage,
    individualDevices,
    isCheckApartLoading,
    isConfirmationModalOpen,
    onForced,
    samePersonalAccountNumderId,
    stageNumber,
    switchStageData,
    transferDevicesData,
  } = useUnit({
    stageNumber: outputs.$stageNumber,
    apartment: outputs.$apartment,
    individualDevices: outputs.$individualDevices,
    switchStageData: outputs.$switchStageData,
    addNewApartmentStageData: outputs.$addNewApartmentStageData,
    transferDevicesData: outputs.$transferDevicesData,
    isConfirmationModalOpen: outputs.$isConfirmationModalOpen,
    samePersonalAccountNumderId: outputs.$samePersonalAccountNumderId,
    isCheckApartLoading: outputs.$isCheckApartLoading,
    handleSubmitSwitchStage: inputs.handleSubmitSwitchStage,
    handleSubmitAddNewApartmentStage: inputs.handleSubmitAddNewApartmentStage,
    handleSubmitTransferDevicesStage: inputs.handleSubmitTransferDevicesStage,
    handleCheckApartmentExist: inputs.handleCheckApartmentExist,
    goBackStage: inputs.goBackStage,
    handleForceConfirmationModalClose: inputs.handleForceConfirmationModalClose,
    onForced: inputs.onForced,
  });

  const homeowner = apartment?.homeownerAccounts?.find(
    (homeownerAccount) => homeownerAccount.id === homeownerId,
  );

  useEffect(() => {
    return inputs.successSplit.watch(() => {
      history.push(`/meters/apartments/${apartmentId}`);
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
