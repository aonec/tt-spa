import React from 'react';
import { manageDistrictsMapService } from './manageDistrictsMapService.models';
import { useUnit } from 'effector-react';
import { ManageDistrictPage } from './ManageDistrictPage';
import {
  deleteDistrictMutation,
  existingDistrictsQuery,
} from './manageDistrictsMapService.api';
import { DeleteDistrictModal } from './DeleteDistrictModal';

const {
  inputs,
  outputs,
  gates: { ManageDistrictsGate },
} = manageDistrictsMapService;

export const ManageDistrictsMapContainer = () => {
  const {
    existingDistricts,
    isDeleteDistrictModalOpen,
    handleCloseDeleteDistrictModal,
    handleOpenDeleteDistrictModal,
    handleDeleteDistrict,
    isDeletingDistrictLoading,
    organizationCoordinates,
  } = useUnit({
    existingDistricts: existingDistrictsQuery.$data,
    isDeleteDistrictModalOpen: outputs.$isDeleteDistrictModalOpen,
    organizationCoordinates: outputs.$organizationCoordinates,
    handleOpenDeleteDistrictModal: inputs.handleOpenDeleteDistrictModal,
    handleCloseDeleteDistrictModal: inputs.handleCloseDeleteDistrictModal,
    handleDeleteDistrict: inputs.handleDeleteDistrict,
    isDeletingDistrictLoading: deleteDistrictMutation.$pending,
  });

  return (
    <>
      <ManageDistrictsGate />
      <DeleteDistrictModal
        isDeleteDistrictModalOpen={isDeleteDistrictModalOpen}
        handleCloseDeleteDistrictModal={handleCloseDeleteDistrictModal}
        handleDeleteDistrict={handleDeleteDistrict}
        isDeletingDistrictLoading={isDeletingDistrictLoading}
      />
      <ManageDistrictPage
        existingDistricts={existingDistricts}
        handleDeleteDistrict={handleOpenDeleteDistrictModal}
        organizationCoordinates={organizationCoordinates}
      />
    </>
  );
};
