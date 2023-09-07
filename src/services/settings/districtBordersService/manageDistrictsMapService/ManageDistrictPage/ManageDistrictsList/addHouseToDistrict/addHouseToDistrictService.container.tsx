import React from 'react';
import { addHouseToDistrictService } from './addHouseToDistrictService.models';
import { AddHouseToDistrictModal } from './view/AddHouseToDistrictModal';
import { useUnit } from 'effector-react';
import { currentUserService } from 'services/currentUserService';
import { addHouseToDistrictMutation } from './addHouseToDistrictService.api';

const { inputs, outputs } = addHouseToDistrictService;

export const AddHouseToDistrictContainer = () => {
  const {
    isOpen,
    openedDistrict,
    hasError,
    house,
    closeAddHouseModal,
    organizationCoordinates,
    handleSearchHouse,
  } = useUnit({
    openedDistrict: outputs.$openedDistrict,
    isOpen: outputs.$isOpen,
    house: outputs.$house,
    hasError: outputs.$hasError,
    closeAddHouseModal: inputs.closeAddHouseModal,
    organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
    handleSearchHouse: inputs.handleSearchHouse,
  });

  const { start: addHouse, pending: isLoading } = useUnit(
    addHouseToDistrictMutation,
  );

  if (!isOpen) return null;

  return (
    <AddHouseToDistrictModal
      isOpen={isOpen}
      openedDistrict={openedDistrict}
      closeAddHouseModal={closeAddHouseModal}
      organizationCoordinates={organizationCoordinates}
      house={house}
      hasError={hasError}
      handleSearchHouse={handleSearchHouse}
      addHouse={addHouse}
      isLoading={isLoading}
    />
  );
};
