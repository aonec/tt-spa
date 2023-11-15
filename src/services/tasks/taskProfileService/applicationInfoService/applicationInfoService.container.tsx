import React, { FC, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { ApplicationInfoBlock } from './view/ApplicationInfoBlock';
import { ApplicationInfoContainerProps } from './applicationInfoService.types';
import { EHouseCategory } from 'api/types';
import { applicationInfoService } from './applicationInfoService.models';
import { PostponeModal } from './view/ApplicationInfoBlock/PostponeModal';

const {
  outputs,
  gates: { PageGate },
  inputs,
} = applicationInfoService;

export const ApplicationInfoContainer: FC<ApplicationInfoContainerProps> = ({
  task,
  isViewerExecutor,
}) => {
  const {
    applicationInfo,
    isLoading,
    isPostponeModalOpen,
    setModalOpen,
    handlePostpone,
  } = useUnit({
    applicationInfo: outputs.$applicationInfo,
    isLoading: outputs.$isLoading,
    isPostponeModalOpen: outputs.$isPostponeModalOpen,
    setModalOpen: inputs.setModalOpen,
    handlePostpone: inputs.handlePostpone,
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
        isViewerExecutor={isViewerExecutor}
        setModalOpen={setModalOpen}
      />
      <PostponeModal
        setModalOpen={setModalOpen}
        isPostponeModalOpen={isPostponeModalOpen}
        handlePostpone={handlePostpone}
      />
    </>
  );
};
