import React, { FC, useEffect, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { ApplicationInfoBlock } from './view/ApplicationInfoBlock';
import { ApplicationInfoContainerProps } from './applicationInfoService.types';
import { EHouseCategory } from 'api/types';
import { applicationInfoService } from './applicationInfoService.models';
import { useNavigate } from 'react-router-dom';

const {
  inputs,
  outputs,
  gates: { PageGate },
} = applicationInfoService;

export const ApplicationInfoContainer: FC<ApplicationInfoContainerProps> = ({
  task,
}) => {
  const { applicationInfo, isLoading, handleDelete, isDeleting } = useUnit({
    applicationInfo: outputs.$applicationInfo,
    isLoading: outputs.$isLoading,
    handleDelete: inputs.handleDelete,
    isDeleting: outputs.$isDeleting,
  });

  const navigate = useNavigate();

  const { address, apartment, houseCategory } = task;

  const apartmentId = apartment?.id;
  const buildingId = task.buildingId;

  useEffect(() => {
    return inputs.onSuccessDelete.watch(() => navigate(-1)).unsubscribe;
  }, [navigate]);

  const buildingProfilePath = useMemo(() => {
    if (houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [houseCategory]);

  const addressLinkPath = apartment
    ? `/apartments/${apartmentId}`
    : `/buildings/${buildingProfilePath}/${buildingId}`;

  return (
    <>
      <PageGate />
      <ApplicationInfoBlock
        applicationInfo={applicationInfo}
        addressLinkPath={addressLinkPath}
        address={address}
        isLoading={isLoading}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};
