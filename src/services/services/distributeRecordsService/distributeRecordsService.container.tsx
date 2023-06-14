import React from 'react';
import { useUnit } from 'effector-react';
import { DistributeRecordsPage } from './view/DistributeRecordsPage';
import { districtsQuery } from './distributeRecordsService.api';
import { distributeRecordsService } from './distributeRecordsService.models';

const {
  gates: { DistributeRecordsGate },
} = distributeRecordsService;

export const DistributeRecordsContainer = () => {
  const { data: districtsList, pending: isLoadingDistricts } =
    useUnit(districtsQuery);

  return (
    <>
      <DistributeRecordsGate />
      <DistributeRecordsPage
        districtsList={districtsList || []}
        isLoadingDistricts={isLoadingDistricts}
      />
    </>
  );
};
