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
  const {
    existingDistricts,
    handleDeleteDistrict,
    organizationCoordinates,
    districtsPageSegment,
    setDistrictsPageSegment,
  } = useUnit({
    existingDistricts: existingDistrictsQuery.$data,
    organizationCoordinates: outputs.$organizationCoordinates,
    handleDeleteDistrict: inputs.handleDeleteDistrict,
    isDeletingDistrictLoading: deleteDistrictMutation.$pending,
    districtsPageSegment: outputs.$districtsPageSegment,
    setDistrictsPageSegment: inputs.setDistrictsPageSegment,
  });

  return (
    <>
      <ManageDistrictsGate />
      <ManageDistrictPage
        existingDistricts={existingDistricts}
        handleDeleteDistrict={handleDeleteDistrict}
        organizationCoordinates={organizationCoordinates}
        districtsPageSegment={districtsPageSegment}
        setDistrictsPageSegment={setDistrictsPageSegment}
      />
    </>
  );
};
