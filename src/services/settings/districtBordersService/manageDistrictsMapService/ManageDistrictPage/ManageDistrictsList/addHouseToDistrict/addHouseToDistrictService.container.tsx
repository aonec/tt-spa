import React, { FC } from 'react';
import { addHouseToDistrictService } from './addHouseToDistrictService.models';
import { AddHouseToDistrictModal } from './view/AddHouseToDistrictModal';
import { useUnit } from 'effector-react';
import { addHouseToDistrictMutation } from './addHouseToDistrictService.api';
import { AddHouseToDistrictContainerProps } from './addHouseToDistrictService.types';
import { currentOrganizationService } from 'services/currentOrganizationService';

const { inputs, outputs } = addHouseToDistrictService;

export const AddHouseToDistrictContainer: FC<
  AddHouseToDistrictContainerProps
> = ({ districtsList }) => {
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
      currentOrganizationService.outputs.$organizationCoordinates,
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
      districtsList={districtsList}
    />
  );
};
