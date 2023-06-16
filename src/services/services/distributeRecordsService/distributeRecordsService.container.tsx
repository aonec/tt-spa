import React from 'react';
import { useUnit } from 'effector-react';
import { DistributeRecordsPage } from './view/DistributeRecordsPage';
import { districtsQuery } from './distributeRecordsService.api';
import { distributeRecordsService } from './distributeRecordsService.models';

const {
  inputs,
  outputs,
  gates: { DistributeRecordsGate },
} = distributeRecordsService;

export const DistributeRecordsContainer = () => {
  const { data: districtsList, pending: isLoadingDistricts } =
    useUnit(districtsQuery);

  const handleSelectDistrict = useUnit(inputs.handleSelectDistrict);
  const handleUnselectDistrict = useUnit(inputs.handleUnselectDistrict);

  const selectedDistrict = useUnit(outputs.$selectedDistrict);

  return (
    <>
      <DistributeRecordsGate />
      <DistributeRecordsPage
        districtsList={districtsList || []}
        isLoadingDistricts={isLoadingDistricts}
        handleSelectDistrict={handleSelectDistrict}
        handleUnselectDistrict={handleUnselectDistrict}
        selectedDistrict={selectedDistrict}
      />
    </>
  );
};
