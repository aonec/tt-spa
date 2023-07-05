import React from 'react';
import { manageDistrictsMapService } from './manageDistrictsMapService.models';
import { useUnit } from 'effector-react';
import { ManageDistrictPage } from './ManageDistrictPage';
import { existingDistrictsQuery } from './manageDistrictsMapService.api';

const {
  gates: { ManageDistrictsGate },
} = manageDistrictsMapService;

export const ManageDistrictsMapContainer = () => {
  const { existingDistricts } = useUnit({
    existingDistricts: existingDistrictsQuery.$data,
  });

  return (
    <>
      <ManageDistrictsGate />
      <ManageDistrictPage existingDistricts={existingDistricts} />
    </>
  );
};
