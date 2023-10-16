import React, { FC, useMemo } from 'react';
import { ApplicationInfoBlock } from './view/ApplicationInfoBlock';
import { applicationInfoService } from './applicationInfoService.models';
import { useUnit } from 'effector-react';
import { ApplicationInfoContainerProps } from './applicationInfoService.types';
import { EHouseCategory } from 'api/types';

const { outputs } = applicationInfoService;

export const ApplicationInfoContainer: FC<ApplicationInfoContainerProps> = ({
  task,
}) => {
  const { applicationInfo } = useUnit({
    applicationInfo: outputs.$applicationInfo,
  });
  const { id, address, apartment, houseCategory } = task;

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
    <ApplicationInfoBlock
      applicationInfo={applicationInfo}
      addressLinkPath={addressLinkPath}
      address={address}
    />
  );
};
