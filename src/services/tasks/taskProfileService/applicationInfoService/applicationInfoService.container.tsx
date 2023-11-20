import React, { FC, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { ApplicationInfoBlock } from './view/ApplicationInfoBlock';
import { ApplicationInfoContainerProps } from './applicationInfoService.types';
import { EHouseCategory } from 'api/types';
import { applicationInfoService } from './applicationInfoService.models';

const {
  outputs,
  gates: { PageGate },
} = applicationInfoService;

export const ApplicationInfoContainer: FC<ApplicationInfoContainerProps> = ({
  task,
}) => {
  const { applicationInfo, isLoading } = useUnit({
    applicationInfo: outputs.$applicationInfo,
    isLoading: outputs.$isLoading,
  });
  const { address, apartment, houseCategory } = task;

  const apartmentId = apartment?.id;
  const buildingId = task.buildingId;

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
      />
    </>
  );
};
