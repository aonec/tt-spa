import React from 'react';
import { addHouseToDistrictService } from './addHouseToDistrictService.models';
import { AddHouseToDistrictModal } from './view/AddHouseToDistrictModal';
import { useUnit } from 'effector-react';
import { currentUserService } from 'services/currentUserService';

const { inputs, outputs } = addHouseToDistrictService;

export const AddHouseToDistrictContainer = () => {
  const {
    isOpen,
    openedDistrict,
    closeAddHouseModal,
    organizationCoordinates,
  } = useUnit({
    openedDistrict: outputs.$openedDistrict,
    isOpen: outputs.$isOpen,
    closeAddHouseModal: inputs.closeAddHouseModal,
    organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
  });

  if (!isOpen) return null;

  return (
    <AddHouseToDistrictModal
      isOpen={isOpen}
      openedDistrict={openedDistrict}
      closeAddHouseModal={closeAddHouseModal}
      organizationCoordinates={organizationCoordinates}
    />
  );
};
