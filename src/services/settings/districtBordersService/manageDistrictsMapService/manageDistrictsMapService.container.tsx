import React from 'react';
import { manageDistrictsMapService } from './manageDistrictsMapService.models';
import { useUnit } from 'effector-react';
import { ManageDistrictPage } from './ManageDistrictPage';
import {
  deleteDistrictMutation,
  existingDistrictsQuery,
} from './manageDistrictsMapService.api';

const {
  inputs,
  outputs,
  gates: { ManageDistrictsGate },
} = manageDistrictsMapService;

export const ManageDistrictsMapContainer = () => {
  const { existingDistricts, handleDeleteDistrict, organizationCoordinates } =
    useUnit({
      existingDistricts: existingDistrictsQuery.$data,
      organizationCoordinates: outputs.$organizationCoordinates,
      handleDeleteDistrict: inputs.handleDeleteDistrict,
      isDeletingDistrictLoading: deleteDistrictMutation.$pending,
    });

  return (
    <>
      <ManageDistrictsGate />
      <ManageDistrictPage
        existingDistricts={existingDistricts}
        handleDeleteDistrict={handleDeleteDistrict}
        organizationCoordinates={organizationCoordinates}
      />
    </>
  );
};
